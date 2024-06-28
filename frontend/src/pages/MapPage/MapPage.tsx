import { FC } from 'react';
import styles from './MapPage.module.scss';
import { Outlet } from 'react-router-dom';
import withAuth from '#components/HOC/withAuth';
import { Card } from '@mui/material';
import MapYandex from '#components/MapYandex/MapYandex';
import { noteAPI } from '#services/NoteService';

const MapPage: FC = () => {
    const { data: places, isLoading } = noteAPI.useFetchPlacesQuery();

    return (
        <div className={styles.MapPage}>
            <div className={styles.Map}>
                <MapYandex
                    isLoading={isLoading}
                    features={places?.data?.map((place) => ({
                        type: 'Feature',
                        id: place.id,
                        geometry: {
                            type: 'Point',
                            coordinates: [place.latitude, place.longitude],
                        },
                        properties: {
                            hintContent: place.name,
                            balloonContent: place.name,
                            name: place.name,
                        },
                    }))}
                />
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
