import { FC } from 'react';
import styles from './SubscriptionsItem.module.scss';
import { ISubscriptionsItemProps } from './ISubscriptionsItemProps';
import ButtonUI from '#components/UI/ButtonUI/ButtonUI';
import { Card, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { MAP_USER_PAGE } from '#utils/urls';
import { userAPI } from '#services/UserService';
import { useAppSelector } from '#hooks/redux';

const SubscriptionsItem: FC<ISubscriptionsItemProps> = ({ user, withButton = false, sx }) => {
    const { user: currentUser } = useAppSelector((state) => state.auth);

    const [unsubscribe] = userAPI.useDeleteSubscriptionMutation();

    const handleSubscribeClick = async () => {
        if (currentUser?.id && user.nickname) {
            const payload = { nickname: currentUser.nickname, data: { targetUserName: user.nickname } };
            unsubscribe(payload);
        }
    };

    return (
        <Card
            variant="outlined"
            className={styles.Item}
            sx={sx}
        >
            <Typography>
                <Link
                    to={MAP_USER_PAGE.replace(':username', user.nickname)}
                    className={styles.Nickname}
                >
                    @{user.nickname}
                </Link>
            </Typography>
            {withButton && (
                <ButtonUI
                    variant="contained"
                    onClick={handleSubscribeClick}
                >
                    Отписаться
                </ButtonUI>
            )}
        </Card>
    );
};

export default SubscriptionsItem;
