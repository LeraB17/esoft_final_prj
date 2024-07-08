import withAuth from '#components/HOC/withAuth';
import { FC } from 'react';
import styles from './ProfilePage.module.scss';
import { Card } from '@mui/material';
import DeleteProfile from '#components/DeleteProfile/DeleteProfile';
import { authAPI } from '#services/AuthService';
import ProfileForm from '#components/ProfileForm/ProfileForm';

const ProfilePage: FC = () => {
    const { data: user, isLoading, error } = authAPI.useFetchInfoQuery();

    return (
        <div className={styles.ProfilePage}>
            <ProfileForm
                isLoading={isLoading}
                isError={!!error}
                user={user}
            />
            <Card variant="outlined">подписчики и подписки</Card>
            <Card variant="outlined">статистика</Card>
            <DeleteProfile
                isLoading={isLoading}
                isError={!!error}
                user={user}
            />
        </div>
    );
};

export default withAuth(ProfilePage);
