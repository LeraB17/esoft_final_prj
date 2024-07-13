import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IUserCreateData } from '../../interfaces/IUserCreateData';
import { authAPI } from '#services/AuthService';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_PAGE } from '#utils/urls';
import FormWrapper from '#components/FormWrapper/FormWrapper';
import InputUI from '#components/UI/InputUI/InputUI';

const FormSignUp: FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [registerUser, {}] = authAPI.useRegisterUserMutation();

    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<IUserCreateData>({
        mode: 'onChange',
    });

    const navigate = useNavigate();

    const onSubmit = async (values: IUserCreateData) => {
        const res = await registerUser(values);
        console.log('res', res);
        if (res.error) {
            // TODO как-нибудь покрасивее сделать
            if ((res.error as any).status === 500) {
                setErrorMessage((res.error as any).data?.message);
            } else if ((res.error as any).status === 422) {
                setErrorMessage((res.error as any).data[0].msg);
            }
        } else {
            navigate(LOGIN_PAGE);
        }
    };

    const password = watch('password');

    return (
        <FormWrapper
            title="Создать аккаунт"
            errorMessage={errorMessage}
            onSubmit={handleSubmit(onSubmit)}
            buttonText="Создать аккаунт"
            textBelow={
                <>
                    Уже есть аккаунт?&nbsp;
                    <Link to={LOGIN_PAGE}>Войти</Link>
                </>
            }
        >
            <Controller
                name="nickname"
                control={control}
                rules={{
                    required: 'Укажите никнейм от 5 до 30 символов',
                    minLength: {
                        value: 5,
                        message: 'Никнейм должен быть не менее 5 символов',
                    },
                    maxLength: {
                        value: 30,
                        message: 'Никнейм должен быть не более 30 символов',
                    },
                }}
                render={({ field }) => (
                    <InputUI
                        {...field}
                        id="nickname"
                        label="Никнейм"
                        type="text"
                        inputError={Boolean(errors.nickname?.message)}
                        helperText={errors.nickname?.message}
                    />
                )}
            />

            <Controller
                name="email"
                control={control}
                rules={{
                    required: 'Укажите почту',
                }}
                render={({ field }) => (
                    <InputUI
                        {...field}
                        id="email"
                        label="Почта"
                        type="email"
                        inputError={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
                    />
                )}
            />

            <Controller
                name="password"
                control={control}
                rules={{
                    required: 'Придумайте пароль',
                    minLength: {
                        value: 6,
                        message: 'Пароль должен быть не менее 6 символов',
                    },
                }}
                render={({ field }) => (
                    <InputUI
                        {...field}
                        id="password"
                        label="Пароль"
                        type="password"
                        inputError={Boolean(errors.password?.message)}
                        helperText={errors.password?.message}
                    />
                )}
            />

            <Controller
                name="confirmPassword"
                control={control}
                rules={{
                    required: 'Подтвердите пароль',
                    minLength: {
                        value: 6,
                        message: 'Пароль должен быть не менее 6 символов',
                    },
                    validate: (value) => value === password || 'Пароль не совпадает с указанным',
                }}
                render={({ field }) => (
                    <InputUI
                        {...field}
                        id="confirmPassword"
                        label="Пароль ещё раз"
                        type="password"
                        inputError={Boolean(errors.confirmPassword?.message)}
                        helperText={errors.confirmPassword?.message}
                    />
                )}
            />
        </FormWrapper>
    );
};

export default FormSignUp;
