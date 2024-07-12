import withAuth from '#components/HOC/withAuth';
import { FC } from 'react';
import styles from './ProfilePage.module.scss';
import { Card, Typography } from '@mui/material';
import DeleteProfile from '#components/DeleteProfile/DeleteProfile';
import ProfileForm from '#components/ProfileForm/ProfileForm';
import SubscriptionsBlock from '#components/SubscriptionsBlock/SubscriptionsBlock';
import { userAPI } from '#services/UserService';
import PlaceTypeDiagram from '#components/PlaceTypeDiagram/PlaceTypeDiagram';
import { noteAPI } from '#services/NoteService';
import { useAppSelector } from '#hooks/redux';

const ProfilePage: FC = () => {
    const { user: currentUser } = useAppSelector((state) => state.auth);
    const {
        data: subscriptions,
        isLoading: isLoadingS,
        error: errorS,
    } = userAPI.useFetchSubscriptionsQuery({ nickname: currentUser?.nickname || '' }, { skip: !currentUser?.nickname });
    const {
        data: subscribers,
        isLoading: isLoadingS2,
        error: errorS2,
    } = userAPI.useFetchSubscribersQuery({ nickname: currentUser?.nickname || '' }, { skip: !currentUser?.nickname });
    const {
        data: placeStats,
        error: errorPS,
        isLoading: isLoadingPS,
    } = noteAPI.useFetchPlaceStatsQuery({ nickname: currentUser?.nickname || '' }, { skip: !currentUser?.nickname });
    const { data: totalCount, isLoading: isLoadingTC } = noteAPI.useFetchTotalCountQuery(
        { nickname: currentUser?.nickname || '' },
        { skip: !currentUser?.nickname }
    );

    return (
        <div className={styles.ProfilePage}>
            <ProfileForm
                isLoading={false}
                isError={!currentUser}
                user={currentUser}
            />
            <Card variant="outlined">
                <SubscriptionsBlock
                    isLoading={isLoadingS || isLoadingS2}
                    isError={!!errorS || !!errorS2}
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
                <Typography
                    variant="h6"
                    sx={{ width: '100%', textAlign: 'end' }}
                >
                    Всего заметок:&nbsp;{totalCount}
                </Typography>
            </Card>
            <div>
                <DeleteProfile
                    isLoading={false}
                    isError={!currentUser}
                    user={currentUser}
                />
            </div>
        </div>
    );
};

export default withAuth(ProfilePage);
