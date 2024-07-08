import { FC, useState } from 'react';
import styles from './UserInfo.module.scss';
import withLoading from '#components/HOC/withLoading';
import withErrorHandling from '#components/HOC/withErrorHandling';
import { IUserInfoProps } from './IUserInfoProps';
import { Avatar, Button, Card, Typography } from '@mui/material';
import { MAP_USER_PAGE, STATIC_URL } from '#utils/urls';
import { useMapContext } from '#components/MapProvider/MapProvider';
import { userAPI } from '#services/UserService';
import { useAppSelector } from '#hooks/redux';
import { Link } from 'react-router-dom';

const avatarSize = '80px';

const UserInfo: FC<IUserInfoProps> = ({ user }) => {
    const { isAllowEdit } = useMapContext();

    const [isSubscribed, setIsSubscribed] = useState<boolean>(user.isSubscribed);

    const { user: currentUser } = useAppSelector((state) => state.auth);

    const [subscribe] = userAPI.useCreateSubscriptionMutation();
    const [unsubscribe] = userAPI.useDeleteSubscriptionMutation();

    const handleSubscribeClick = async () => {
        if (currentUser?.id && user.nickname) {
            const payload = { nickname: currentUser.nickname, data: { targetUserName: user.nickname } };
            if (isSubscribed) {
                unsubscribe(payload);
                setIsSubscribed(false);
            } else {
                subscribe(payload);
                setIsSubscribed(true);
            }
        }
    };

    return (
        <Card
            variant="outlined"
            className={styles.UserInfo}
        >
            <Avatar
                alt="Avatar"
                src={`${STATIC_URL}${user?.avatar}`}
                sx={{ width: avatarSize, height: avatarSize }}
            />
            <div className={styles.Subscribe}>
                <Typography
                    variant="h6"
                    className={styles.UserName}
                >
                    <Link to={MAP_USER_PAGE.replace(':username', user?.nickname)}> @{user?.nickname}</Link>
                </Typography>

                {!isAllowEdit && (
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ width: '100%' }}
                        onClick={handleSubscribeClick}
                    >
                        {isSubscribed ? 'Отписаться' : 'Подписаться'}
                    </Button>
                )}
            </div>
        </Card>
    );
};

export default withErrorHandling(withLoading(UserInfo));
