import { FC, useState } from 'react';
import styles from './DeleteProfile.module.scss';
import withLoading from '#components/HOC/withLoading';
import withErrorHandling from '#components/HOC/withErrorHandling';
import { IDeleteProfileProps } from './IDeleteProfileProps';
import { Box, Card, Typography } from '@mui/material';
import { userAPI } from '#services/UserService';
import { Controller, useForm } from 'react-hook-form';
import { IUserDeleteData } from '#interfaces/IUserCreateData';
import { useNavigate } from 'react-router-dom';
import { MAIN_PAGE } from '#utils/urls';
import ButtonUI from '#components/UI/ButtonUI/ButtonUI';
import InputUI from '#components/UI/InputUI/InputUI';
import { authAPI } from '#services/AuthService';

const DeleteProfile: FC<IDeleteProfileProps> = ({ user }) => {
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [deleteUser, {}] = userAPI.useDeleteUserMutation();
    const [logout, {}] = authAPI.useLogoutUserMutation();

    const navigate = useNavigate();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IUserDeleteData>({
        mode: 'onChange',
    });

    const onSubmit = async (values: IUserDeleteData) => {
        console.log('submit', values);
        if (window.confirm('Вы действительно хотите удалить заметку?')) {
            await deleteUser({ nickname: user?.nickname || '', password: values.password })
                .unwrap()
                .then(async (payload) => {
                    console.log('fulfilled', payload);
                    await logout()
                        .unwrap()
                        .then((payload) => {
                            console.log('fulfilled', payload);
                        })
                        .catch((error) => {
                            console.error('rejected', error);
                            setErrorMessage('Что-то пошло не так');
                        });
                    navigate(MAIN_PAGE);
                })
                .catch((error) => {
                    console.error('rejected', error);
                    setErrorMessage('Не удалось удалить профиль, возможно, неверный пароль');
                });
        }
    };

    return (
        <Card
            variant="outlined"
            sx={{ padding: '10px' }}
        >
            {errorMessage && <Typography className={styles.ErrorMessage}>{errorMessage}</Typography>}

            <Box
                component="form"
                className={styles.Form}
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    '& > :not(style)': { m: 1, width: '90%' },
                }}
            >
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: 'Введите пароль',
                    }}
                    render={({ field }) => (
                        <InputUI
                            {...field}
                            id="passwordDelete"
                            label="Пароль"
                            type="password"
                            inputError={Boolean(errors.password?.message)}
                            helperText={errors.password?.message}
                        />
                    )}
                />

                <ButtonUI
                    type="submit"
                    color="error"
                    variant="contained"
                >
                    Удалить профиль
                </ButtonUI>
            </Box>
        </Card>
    );
};

export default withErrorHandling(withLoading(DeleteProfile));
