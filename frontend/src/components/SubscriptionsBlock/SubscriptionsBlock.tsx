import { FC, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import TabPanel from '#components/TabPanel/TabPanel';
import withLoading from '#components/HOC/withLoading';
import withErrorHandling from '#components/HOC/withErrorHandling';
import { ISubscriptionsBlockProps } from './ISubscriptionsBlockProps';
import SubscriptionsList from '#components/SubscriptionsList/SubscriptionsList';

const SubscriptionsBlock: FC<ISubscriptionsBlockProps> = ({ subscriptions, subscribers }) => {
    const [value, setValue] = useState<number>(1);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="tabs"
            >
                <Tab
                    value={1}
                    label="Подписки"
                />
                <Tab
                    value={2}
                    label="Подписчики"
                />
            </Tabs>
            <TabPanel
                value={value}
                index={1}
            >
                {subscriptions && (
                    <SubscriptionsList
                        userList={subscriptions}
                        isEdit={true}
                    />
                )}
            </TabPanel>
            <TabPanel
                value={value}
                index={2}
            >
                {subscribers && <SubscriptionsList userList={subscribers} />}
            </TabPanel>
        </Box>
    );
};

export default withErrorHandling(withLoading(SubscriptionsBlock));
