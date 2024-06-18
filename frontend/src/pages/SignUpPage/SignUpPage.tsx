import { FC } from 'react';
import FormSignUp from '#components/FormSignUp/FormSignUp';
import styles from './SignUpPage.module.scss';

const SignUpPage: FC = () => {
    return (
        <div className={styles.SignUpPage}>
            <FormSignUp />
        </div>
    );
};

export default SignUpPage;
