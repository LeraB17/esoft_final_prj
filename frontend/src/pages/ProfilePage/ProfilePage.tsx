import withAuth from '#components/HOC/withAuth';
import { FC } from 'react';
import styles from './ProfilePage.module.scss';
import { Card } from '@mui/material';
import DeleteProfile from '#components/DeleteProfile/DeleteProfile';
import { authAPI } from '#services/AuthService';
import ProfileForm from '#components/ProfileForm/ProfileForm';
import SubscriptionsBlock from '#components/SubscriptionsBlock/SubscriptionsBlock';
import { userAPI } from '#services/UserService';

const ProfilePage: FC = () => {
    const { data: user, isLoading, error } = authAPI.useFetchInfoQuery();
    const {
        data: subscriptions,
        isLoading: isLoadingS,
        error: errorS,
    } = userAPI.useFetchSubscriptionsQuery({ nickname: user?.nickname || '' }, { skip: !user?.nickname });
    const {
        data: subscribers,
        isLoading: isLoadingS2,
        error: errorS2,
    } = userAPI.useFetchSubscribersQuery({ nickname: user?.nickname || '' }, { skip: !user?.nickname });

    return (
        <div className={styles.ProfilePage}>
            <ProfileForm
                isLoading={isLoading}
                isError={!!error}
                user={user}
            />
            <Card variant="outlined">
                <SubscriptionsBlock
                    isLoading={isLoading || isLoadingS || isLoadingS2}
                    isError={!!error || !!errorS || !!errorS2}
                    subscriptions={subscriptions?.map((user) => user.targetUser)}
                    subscribers={subscribers?.map((user) => user.targetUser)}
                />
            </Card>
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
