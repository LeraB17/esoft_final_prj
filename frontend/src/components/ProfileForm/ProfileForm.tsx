import { FC, useEffect, useRef, useState } from 'react';
import styles from './ProfileForm.module.scss';
import { IProfileFormProps } from './IProfileFormProps';
import { Controller, useForm } from 'react-hook-form';
import { IUserUpdateData } from '#interfaces/IUserCreateData';
import InputUI from '#components/UI/InputUI/InputUI';
import FormWrapper from '#components/FormWrapper/FormWrapper';
import withLoading from '#components/HOC/withLoading';
import withErrorHandling from '#components/HOC/withErrorHandling';
import { Typography } from '@mui/material';
import AvatarUI from '#components/UI/AvatarUI/AvatarUI';
import ButtonUI from '#components/UI/ButtonUI/ButtonUI';
import { authAPI } from '#services/AuthService';
import { IUserLoginData } from '#interfaces/IUserLoginData';
import { useAppDispatch } from '#hooks/redux';
import { setToken } from '#store/reducers/authSlice';
import { saveToken } from '#utils/token';
import { userAPI } from '#services/UserService';

const ProfileFormInside: FC<IProfileFormProps> = ({ user }) => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const inputFileRef = useRef(null);

    const [newAvatar, setNewAvatar] = useState<File | null>(null);
    const [isSaveCurrentAvatar, setIsSaveCurrentAvatar] = useState<boolean>(true);

    const [loginUser, {}] = authAPI.useLoginUserMutation();
    const [updateUser, {}] = userAPI.useUpdateUserMutation();

    const {
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm<IUserUpdateData>({
        mode: 'onChange',
    });

    useEffect(() => {
        if (user) {
            reset({
                nickname: user.nickname,
                email: user.email,
                password: '',
                newPassword: '',
            });
        }
    }, [user]);

    const dispatch = useAppDispatch();

    const onSubmit = async (values: IUserUpdateData) => {
        console.log('submit', values);
        if (!isEdit) {
            const userData: IUserLoginData = {
                email: user?.email || '',
                password: values.password,
            };

            await loginUser(userData)
                .unwrap()
                .then((payload) => {
                    console.log('fulfiled', payload);
                    const accessToken = payload.tokens?.accessToken;
                    if (accessToken) {
                        saveToken(accessToken);
                        dispatch(setToken(accessToken));
                    }
                    setIsEdit(true);
                    setErrorMessage('');
                })
                .catch((error) => {
                    console.log('error', error);
                    setErrorMessage('Неверный пароль');
                });
        } else {
            const formData = new FormData();

            if (values.nickname && values.nickname !== user?.nickname) {
                formData.append('nickname', values.nickname);
            }
            if (values.email && values.email !== user?.email) {
                formData.append('email', values.email);
            }
            formData.append('password', values.password);

            if (values.newPassword && values.newPassword !== values.password) {
                formData.append('newPassword', values.newPassword);
            }

            if (!isSaveCurrentAvatar) {
                if (!newAvatar) {
                    formData.append('avatar', '');
                } else {
                    formData.append('avatar', newAvatar);
                }
            }

            let count = 0;
            for (let pair of formData.entries()) {
                count += 1;
                console.log(`${pair[0]}: ${pair[1]}`);
            }

            console.log('count', count);
            if (count > 1) {
                await updateUser({ nickname: user?.nickname || '', data: formData })
                    .unwrap()
                    .then((payload) => {
                        console.log('fulfilled', payload);
                        setErrorMessage('');
                        setIsEdit(false);
                        reset({ password: '', newPassword: '' });
                    })
                    .catch((error) => {
                        console.error('rejected', error);
                        setErrorMessage('Не удалось обновить информацию :(');
                    });
            } else {
                setErrorMessage('Вы ничего не изменили');
            }
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.files;
        if (value) {
            const files = Array.from(value);
            setNewAvatar(files[0]);
            setIsSaveCurrentAvatar(false);
        }
    };

    const handleRemoveImage = () => {
        if (newAvatar) {
            setNewAvatar(null);
            setIsSaveCurrentAvatar(true);
        } else if (user?.avatar) {
            setIsSaveCurrentAvatar(false);
        }
    };

    const password = watch('password');

    if (!user) {
        return <Typography>Пользователь не найден</Typography>;
    }

    return (
        <FormWrapper
            title="Ваши данные"
            errorMessage={errorMessage}
            onSubmit={handleSubmit(onSubmit)}
            buttonText={isEdit ? 'Сохранить' : 'Изменить'}
            fullWidth={true}
            textBelow={<>Для изменения информации сначала введите пароль</>}
        >
            <div className={styles.Block}>
                <AvatarUI
                    isFile={!!newAvatar}
                    path={newAvatar ? newAvatar : isSaveCurrentAvatar ? user?.avatar : ''}
                    size="120px"
                    isBordered={true}
                />
                <div className={styles.Buttons}>
                    <ButtonUI
                        type="button"
                        variant="contained"
                        sx={{ marginBottom: '10px' }}
                        onClick={() => (inputFileRef.current as any).click()}
                        disabled={!isEdit}
                    >
                        Загрузить аватар
                    </ButtonUI>

                    <Controller
                        name="avatar"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                ref={inputFileRef}
                                multiple
                                onChange={(e) => {
                                    handleImageChange(e);
                                    field.onChange(e.target.files);
                                }}
                            />
                        )}
                    />

                    <ButtonUI
                        type="button"
                        variant="outlined"
                        onClick={() => handleRemoveImage()}
                        disabled={!isEdit || (!user?.avatar && !newAvatar)}
                    >
                        Удалить аватар
                    </ButtonUI>
                </div>
            </div>

            <Controller
                name="nickname"
                control={control}
                defaultValue=""
                rules={{
                    validate: (value) => {
                        if (value && isEdit) {
                            if (value.length < 5) {
                                return 'Никнейм должен быть не менее 5 символов';
                            }
                            if (value.length > 30) {
                                return 'Никнейм должен быть не более 30 символов';
                            }
                        }
                        return true;
                    },
                }}
                render={({ field }) => (
                    <InputUI
                        {...field}
                        id="nickname"
                        label="Никнейм"
                        type="text"
                        disabled={!isEdit}
                        inputError={Boolean(errors.nickname?.message)}
                        helperText={errors.nickname?.message}
                    />
                )}
            />

            <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <InputUI
                        {...field}
                        id="email"
                        label="Почта"
                        type="email"
                        disabled={!isEdit}
                        inputError={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
                    />
                )}
            />

            <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                    required: 'Введите пароль',
                }}
                render={({ field }) => (
                    <InputUI
                        {...field}
                        id="password"
                        label="Пароль"
                        type="password"
                        disabled={isEdit}
                        inputError={Boolean(errors.password?.message)}
                        helperText={errors.password?.message}
                    />
                )}
            />

            <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                rules={{
                    validate: (value) => {
                        if (value && isEdit) {
                            if (value === password) {
                                return 'Пароль должен отличаться';
                            }
                        }
                        return true;
                    },
                }}
                render={({ field }) => (
                    <InputUI
                        {...field}
                        id="newPassword"
                        label="Новый пароль"
                        type="password"
                        disabled={!isEdit}
                        inputError={Boolean(errors.newPassword?.message)}
                        helperText={errors.newPassword?.message}
                    />
                )}
            />
        </FormWrapper>
    );
};

export default withErrorHandling(withLoading(ProfileFormInside));
