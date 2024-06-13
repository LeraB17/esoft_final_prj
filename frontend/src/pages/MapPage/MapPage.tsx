import { FC } from 'react';
import styles from './MapPage.module.scss';
import Map from '#components/Map/Map';
import { Outlet } from 'react-router-dom';

const MapPage: FC = () => {
    return (
        <div className={styles.MapPage}>
            <div className={styles.Map}>
                <Map />
            </div>
            <div className={styles.Panel}>
                <Outlet />
            </div>
        </div>
    );
};

export default MapPage;
