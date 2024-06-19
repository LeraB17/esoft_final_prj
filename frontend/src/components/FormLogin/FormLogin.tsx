import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IUserLoginData } from '#interfaces/IUserLoginData';
import { Link, useNavigate } from 'react-router-dom';
import { MAP_PAGE, SIGN_UP_PAGE } from '#utils/urls';
import { TextField } from '@mui/material';
import FormWrapper from '#components/FormWrapper/FormWrapper';
import { authAPI } from '#services/AuthService';
import { useAppDispatch } from '#hooks/redux';
import { setToken } from '#store/reducers/authSlice';
import { saveToken } from '#utils/token';

const FormLogin: FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [loginUser, {}] = authAPI.useLoginUserMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUserLoginData>({
        mode: 'onChange',
    });

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSubmit = async (values: IUserLoginData) => {
        const res = await loginUser(values);
        console.log('res', res);
        if (res.error) {
            // TODO как-нибудь покрасивее сделать
            if ((res.error as any).status === 500) {
                setErrorMessage((res.error as any).data?.message);
            } else if ((res.error as any).status === 422) {
                setErrorMessage((res.error as any).data[0].msg);
            } else if ((res.error as any).status === 401) {
                setErrorMessage('Неверная почта или пароль');
            }
        } else {
            const accessToken = (res.data as any).tokens?.accessToken;
            dispatch(setToken(accessToken));
            if (accessToken) {
                saveToken(accessToken);
            }
            navigate(MAP_PAGE);
        }
    };

    return (
        <FormWrapper
            title="Войти"
            errorMessage={errorMessage}
            onSubmit={handleSubmit(onSubmit)}
            buttonText="Войти"
            textBelow={
                <>
                    Ещё нет аккаунта?&nbsp;
                    <Link to={SIGN_UP_PAGE}>Зарегистрироваться</Link>
                </>
            }
        >
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
                    required: 'Укажите пароль',
                })}
                type="password"
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
            />
        </FormWrapper>
    );
};

export default FormLogin;
