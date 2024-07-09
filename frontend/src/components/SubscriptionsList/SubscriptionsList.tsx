import { FC } from 'react';
import styles from './SubscriptionsList.module.scss';
import SubscriptionsItem from '#components/SubscriptionsItem/SubscriptionsItem';
import { ISubscriptionsListProps } from './ISubscriptionsListProps';
import { Typography } from '@mui/material';

const SubscriptionsList: FC<ISubscriptionsListProps> = ({ userList, isEdit = false }) => {
    return (
        <div className={styles.Fade}>
            {userList && userList?.length ? (
                <div className={`scrollable-text-block ${styles.List}`}>
                    {userList?.map((user) => (
                        <SubscriptionsItem
                            key={user.id}
                            user={user}
                            withButton={isEdit}
                            sx={{ marginBottom: 1 }}
                        />
                    ))}
                </div>
            ) : (
                <Typography>Ничего не найдено</Typography>
            )}
        </div>
    );
};

export default SubscriptionsList;
