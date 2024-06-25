import { FC } from 'react';
import styles from './MapPage.module.scss';
import Map from '#components/Map/Map';
import { Outlet } from 'react-router-dom';
import withAuth from '#components/HOC/withAuth';
import { Card } from '@mui/material';

const MapPage: FC = () => {
    return (
        <div className={styles.MapPage}>
            <div className={styles.Map}>
                <Map />
            </div>
            <Card
                variant="outlined"
                className={styles.Panel}
            >
                <Outlet />
            </Card>
        </div>
    );
};

export default withAuth(MapPage);
