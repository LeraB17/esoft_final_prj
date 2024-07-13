import { FC } from 'react';
import styles from './AuthPage.module.scss';
import FormLogin from '#components/FormLogin/FormLogin';
import withNotAuth from '#components/HOC/withNotAuth';

const AuthPage: FC = () => {
    return (
        <div className={styles.AuthPage}>
            <FormLogin />
        </div>
    );
};

export default withNotAuth(AuthPage);
