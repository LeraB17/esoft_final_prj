import { FC, useEffect } from 'react';
import styles from './AuthPage.module.scss';
import FormLogin from '#components/FormLogin/FormLogin';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '#store/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import { MAP_PAGE } from '#utils/urls';

const AuthPage: FC = () => {
    const navigate = useNavigate();

    const isAuth = useSelector(selectIsAuth);

    useEffect(() => {
        if (isAuth) {
            navigate(MAP_PAGE);
        }
    }, []);

    return (
        <div className={styles.AuthPage}>
            <FormLogin />
        </div>
    );
};

export default AuthPage;
