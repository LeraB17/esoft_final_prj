import { FC, useState } from 'react';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { IUserCreateData } from '../../interfaces/IUserCreateData';
import { authAPI } from '#services/AuthService';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_PAGE } from '#utils/urls';
import FormWrapper from '#components/FormWrapper/FormWrapper';

const FormSignUp: FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [registerUser, {}] = authAPI.useRegisterUserMutation();

    const {
        register,
        handleSubmit,
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
            <TextField
                id="nickname"
                label="Никнейм"
                variant="standard"
                {...register('nickname', {
                    required: 'Укажите никнейм от 5 до 30 символов',
                    minLength: {
                        value: 5,
                        message: 'Никнейм должен быть не менее 5 символов',
                    },
                    maxLength: {
                        value: 30,
                        message: 'Никнейм должен быть не более 30 символов',
                    },
                })}
                type="text"
                error={Boolean(errors.nickname?.message)}
                helperText={errors.nickname?.message}
            />

            <TextField
                id="email"
                label="Почта"
                variant="standard"
                {...register('email', { required: 'Укажите почту' })}
                type="email"
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
            />

            <TextField
                id="password"
                label="Пароль"
                variant="standard"
                {...register('password', {
                    required: 'Придумайте пароль',
                    minLength: {
                        value: 6,
                        message: 'Пароль должен быть не менее 6 символов',
                    },
                })}
                type="password"
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
            />

            <TextField
                id="confirmPassword"
                label="Пароль ещё раз"
                variant="standard"
                {...register('confirmPassword', {
                    required: 'Подтвердите пароль',
                    minLength: {
                        value: 6,
                        message: 'Пароль должен быть не менее 6 символов',
                    },
                    validate: (value) => value === password || 'Пароль не совпадает с указанным',
                })}
                type="password"
                error={Boolean(errors.confirmPassword?.message)}
                helperText={errors.confirmPassword?.message}
            />
        </FormWrapper>
    );
};

export default FormSignUp;
