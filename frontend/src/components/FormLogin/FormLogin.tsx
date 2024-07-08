import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IUserLoginData } from '#interfaces/IUserLoginData';
import { Link, useNavigate } from 'react-router-dom';
import { MAP_PAGE, SIGN_UP_PAGE } from '#utils/urls';
import FormWrapper from '#components/FormWrapper/FormWrapper';
import { authAPI } from '#services/AuthService';
import { useAppDispatch } from '#hooks/redux';
import { setToken } from '#store/reducers/authSlice';
import { saveToken } from '#utils/token';
import InputUI from '#components/UI/InputUI/InputUI';

const FormLogin: FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [loginUser, {}] = authAPI.useLoginUserMutation();

    const {
        handleSubmit,
        control,
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
            <Controller
                name="email"
                control={control}
                rules={{ required: 'Укажите почту' }}
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
                rules={{ required: 'Укажите пароль' }}
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
        </FormWrapper>
    );
};

export default FormLogin;
