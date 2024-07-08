import { FC, useState } from 'react';
import styles from './UserInfo.module.scss';
import withLoading from '#components/HOC/withLoading';
import withErrorHandling from '#components/HOC/withErrorHandling';
import { IUserInfoProps } from './IUserInfoProps';
import { Card, Typography } from '@mui/material';
import { MAP_USER_PAGE } from '#utils/urls';
import { useMapContext } from '#components/MapProvider/MapProvider';
import { userAPI } from '#services/UserService';
import { useAppSelector } from '#hooks/redux';
import { Link } from 'react-router-dom';
import AvatarUI from '#components/UI/AvatarUI/AvatarUI';
import ButtonUI from '#components/UI/ButtonUI/ButtonUI';

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
            <AvatarUI
                path={user?.avatar}
                size="80px"
            />
            <div className={styles.Subscribe}>
                <Typography
                    variant="h6"
                    className={styles.UserName}
                >
                    <Link to={MAP_USER_PAGE.replace(':username', user?.nickname)}> @{user?.nickname}</Link>
                </Typography>

                {!isAllowEdit && (
                    <ButtonUI
                        type="submit"
                        variant="contained"
                        sx={{ width: '100%' }}
                        onClick={handleSubscribeClick}
                    >
                        {isSubscribed ? 'Отписаться' : 'Подписаться'}
                    </ButtonUI>
                )}
            </div>
        </Card>
    );
};

export default withErrorHandling(withLoading(UserInfo));
