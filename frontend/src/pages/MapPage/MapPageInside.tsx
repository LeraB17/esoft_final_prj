import { FC } from 'react';
import styles from './MapPage.module.scss';
import { Outlet } from 'react-router-dom';
import withAuth from '#components/HOC/withAuth';
import { Card } from '@mui/material';
import MapYandex from '#components/MapYandex/MapYandex';
import { noteAPI } from '#services/NoteService';
import { useMapContext } from '#components/MapProvider/MapProvider';
import UserInfo from '#components/UserInfo/UserInfo';
import { userAPI } from '#services/UserService';

const MapPageInside: FC = () => {
    const { userName } = useMapContext();

    const { data: places, isLoading } = noteAPI.useFetchPlacesQuery({ nickname: userName }, { skip: userName === '' });
    const {
        data: user,
        error: errorU,
        isLoading: isLoadingU,
    } = userAPI.useFetchUserInfoQuery({ nickname: userName }, { skip: userName === '' });

    return (
        <div className={styles.MapPage}>
            <div className={styles.UserInfo}>
                {user && (
                    <UserInfo
                        isLoading={isLoadingU}
                        isError={!!errorU}
                        user={user}
                    />
                )}
            </div>
            <div className={styles.Map}>
                <MapYandex
                    isLoading={isLoading}
                    features={places?.data?.map((place) => ({
                        type: place.type,
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

export default withAuth(MapPageInside);
