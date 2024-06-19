import { FC, useEffect } from 'react';
import FormSignUp from '#components/FormSignUp/FormSignUp';
import styles from './SignUpPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '#store/reducers/authSlice';
import { MAP_PAGE } from '#utils/urls';

const SignUpPage: FC = () => {
    const navigate = useNavigate();

    const isAuth = useSelector(selectIsAuth);

    useEffect(() => {
        if (isAuth) {
            navigate(MAP_PAGE);
        }
    }, []);

    return (
        <div className={styles.SignUpPage}>
            <FormSignUp />
        </div>
    );
};

export default SignUpPage;
