import withAuth from '#components/HOC/withAuth';
import { FC } from 'react';
import styles from './ProfilePage.module.scss';
import { Card, Typography } from '@mui/material';
import DeleteProfile from '#components/DeleteProfile/DeleteProfile';
import { authAPI } from '#services/AuthService';
import ProfileForm from '#components/ProfileForm/ProfileForm';
import SubscriptionsBlock from '#components/SubscriptionsBlock/SubscriptionsBlock';
import { userAPI } from '#services/UserService';
import PlaceTypeDiagram from '#components/PlaceTypeDiagram/PlaceTypeDiagram';
import { noteAPI } from '#services/NoteService';

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
    const {
        data: placeStats,
        error: errorPS,
        isLoading: isLoadingPS,
    } = noteAPI.useFetchPlaceStatsQuery({ nickname: user?.nickname || '' }, { skip: !user?.nickname });
    const { data: totalCount, isLoading: isLoadingTC } = noteAPI.useFetchTotalCountQuery(
        { nickname: user?.nickname || '' },
        { skip: !user?.nickname }
    );

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
            <Card
                variant="outlined"
                sx={{ height: '350px' }}
                className={styles.Chart}
            >
                <PlaceTypeDiagram
                    isLoading={isLoadingPS || isLoadingTC}
                    isError={!!errorPS}
                    data={placeStats}
                    withLegend={true}
                    size={100}
                />
                {totalCount && (
                    <Typography
                        variant="h6"
                        sx={{ width: '100%', textAlign: 'end' }}
                    >
                        Всего заметок:&nbsp;{totalCount}
                    </Typography>
                )}
            </Card>
            <div>
                <DeleteProfile
                    isLoading={isLoading}
                    isError={!!error}
                    user={user}
                />
            </div>
        </div>
    );
};

export default withAuth(ProfilePage);
