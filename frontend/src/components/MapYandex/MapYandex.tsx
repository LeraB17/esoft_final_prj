import { FC, useEffect, useRef, useState } from 'react';
import styles from './MapYandex.module.scss';
import { Map, ObjectManager, Placemark, TypeSelector, YMaps, ZoomControl } from '@pbe/react-yandex-maps';
import { IMapProps } from './IMapProps';
import { useAppDispatch, useAppSelector } from '#hooks/redux';
import { latitudeDefault, longitudeDefault, setPlace } from '#store/reducers/noteSlice';
import { matchPath, useNavigate } from 'react-router-dom';
import { ADD_NOTE_PAGE, MAP_PAGE, MAP_USER_PAGE, NOTE_USER_PAGE } from '#utils/urls';
import withLoading from '#components/HOC/withLoading';
import { getSearchString } from '#utils/functions';

const MapYandex: FC<IMapProps> = ({ features }) => {
    const { place, isOpenNote } = useAppSelector((state) => state.note);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [mapCenter, setMapCenter] = useState<[number, number]>([latitudeDefault, longitudeDefault]);
    const [userLocation, setUserLocation] = useState<[number, number]>([0, 0]);
    const [zoom, setZoom] = useState<number>(12);

    useEffect(() => {
        if (place && isOpenNote) {
            setMapCenter([place.latitude, place.longitude]);
            setZoom(16);
        }
    }, [isOpenNote]);

    const objectManagerRef = useRef<any>(null);

    const handleMapClick = (e: ymaps.IEvent) => {
        if (!isOpenNote) {
            const coords = e.get('coords');
            if (coords) {
                dispatch(setPlace({ name: '', latitude: coords[0], longitude: coords[1] }));
                navigate(ADD_NOTE_PAGE);
            }
        }
    };

    const handleObjectClick = (e: ymaps.IEvent) => {
        const objectId = e.get('objectId');
        const clickedObject = objectManagerRef.current.objects.getById(objectId);

        let pathTo;
        if (matchPath(MAP_USER_PAGE, location.pathname) || matchPath(NOTE_USER_PAGE, location.pathname)) {
            pathTo = MAP_USER_PAGE;
        } else {
            pathTo = MAP_PAGE;
        }
        navigate(`${pathTo}${getSearchString({ place: clickedObject.id })}`);
    };

    const handleZoomChange = (event: ymaps.IEvent) => {
        const target = event.get('target') as ymaps.Map;
        setZoom(target.getZoom());
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
                    if (!isOpenNote) {
                        setMapCenter([latitude, longitude]);
                    }
                },
                (error) => {
                    console.error("Error getting user's location: ", error);
                }
            );
        }
    }, []);

    return (
        <div className={styles.Map}>
            <YMaps query={{ apikey: import.meta.env.VITE_YANDEX_API }}>
                <Map
                    state={{ center: mapCenter, zoom: zoom }}
                    onBoundsChange={handleZoomChange}
                    width="100%"
                    height="100%"
                    onClick={handleMapClick}
                >
                    {place?.latitude && place?.longitude && !isOpenNote && (
                        <Placemark
                            geometry={[place.latitude, place.longitude]}
                            properties={{ hintContent: 'выбранное место', balloonContent: 'выбранное место' }}
                        />
                    )}
                    {userLocation[0] > 0 && userLocation[1] > 0 && (
                        <Placemark
                            options={{ preset: 'islands#redIcon' }}
                            geometry={userLocation}
                        />
                    )}
                    <ZoomControl options={{ position: { left: '10px', top: '10px' } }} />
                    <TypeSelector />
                    <ObjectManager
                        instanceRef={objectManagerRef}
                        options={{
                            clusterize: true,
                            gridSize: 64,
                        }}
                        objects={{
                            openBalloonOnClick: true,
                            preset: 'islands#greenDotIcon',
                        }}
                        clusters={{
                            preset: 'islands#greenClusterIcons',
                        }}
                        features={features}
                        onClick={handleObjectClick}
                    />
                </Map>
            </YMaps>
        </div>
    );
};

export default withLoading(MapYandex);
