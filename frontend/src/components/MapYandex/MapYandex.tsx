import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './MapYandex.module.scss';
import { Circle, Map, ObjectManager, Placemark, TypeSelector, YMaps, ZoomControl } from '@pbe/react-yandex-maps';
import { IMapProps } from './IMapProps';
import { useAppDispatch, useAppSelector } from '#hooks/redux';
import { latitudeDefault, longitudeDefault, setPlace } from '#store/reducers/noteSlice';
import { useNavigate } from 'react-router-dom';
import { ADD_NOTE_PAGE } from '#utils/urls';
import withLoading from '#components/HOC/withLoading';
import { getSearchString } from '#utils/functions';
import { useMapContext } from '#components/MapProvider/MapProvider';
import { Card } from '@mui/material';
import { getPlacemarkPreset, transformObjectType } from '../../utils/mapFunctions';
import { LocationType, PlaceType } from '#interfaces/MapTypes';
import { setUserLocation } from '#store/reducers/filterSlice';

const MapYandex: FC<IMapProps> = ({ features }) => {
    const { isAllowEdit, getFilterLink } = useMapContext();

    const { place, isOpenNote } = useAppSelector((state) => state.note);
    const { radius, userLocation } = useAppSelector((state) => state.filters);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [mapCenter, setMapCenter] = useState<[number, number]>([latitudeDefault, longitudeDefault]);
    const [zoom, setZoom] = useState<number>(12);

    const [selectType, setSelectType] = useState<PlaceType>('other');

    useEffect(() => {
        if (place && isOpenNote) {
            setMapCenter([place.latitude, place.longitude]);
            setZoom(16);
        }
    }, [isOpenNote]);

    useEffect(() => {
        const initializeMap = () => {
            if (window.ymaps) {
                window.ymaps.ready(() => {
                    console.log('YMaps is ready');
                });
            }
        };

        if (!window.ymaps) {
            const script = document.createElement('script');
            script.src = `https://api-maps.yandex.ru/${import.meta.env.VITE_YANDEX_API_VERSION}/?apikey=${
                import.meta.env.VITE_YANDEX_API
            }&lang=${import.meta.env.VITE_YANDEX_API_LANG}`;
            script.onload = initializeMap;
            document.body.appendChild(script);
        } else {
            initializeMap();
        }
    }, []);

    const objectManagerRef = useRef<any>(null);

    const getPlaceType = async (coords: any): Promise<PlaceType | undefined> => {
        let placeType: PlaceType | undefined;
        try {
            const result = await window.ymaps.geocode(coords);
            const geoObject = result.geoObjects.get(0);
            const metaData = (geoObject.properties.get('metaDataProperty', {}) as any).GeocoderMetaData;
            const objectType = metaData.kind;
            const objectName = metaData.text;

            placeType = transformObjectType(objectType);
            setSelectType(placeType);
            console.log(`Тип объекта: ${objectType} (${placeType}), Название: ${objectName}`);
        } catch (err) {
            console.error('Geocode error: ', err);
        }
        return placeType;
    };

    const handleMapClick = useCallback(
        (e: ymaps.IEvent) => {
            if (!isOpenNote && isAllowEdit) {
                const coords = e.get('coords');
                if (coords) {
                    if (window.ymaps) {
                        getPlaceType(coords).then((placeType) => {
                            dispatch(
                                setPlace({
                                    name: '',
                                    latitude: coords[0],
                                    longitude: coords[1],
                                    type: placeType || 'other',
                                })
                            );
                            navigate(ADD_NOTE_PAGE);
                        });
                    } else {
                        console.log('YMaps is not loaded yet');
                    }
                }
            }
        },
        [dispatch, navigate, isOpenNote, isAllowEdit]
    );

    const handleObjectClick = (e: ymaps.IEvent) => {
        const objectId = e.get('objectId');
        const clickedObject = objectManagerRef.current.objects.getById(objectId);

        const pathTo = getFilterLink();
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
                    const userLoc = [latitude, longitude] as LocationType;
                    dispatch(setUserLocation(userLoc));
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

    const transformedFeatures = useMemo(
        () =>
            features?.map((feature) => ({
                ...feature,
                options: {
                    preset: getPlacemarkPreset(feature?.type),
                },
            })),
        [features]
    );

    return (
        <div className={styles.Map}>
            <YMaps query={{ apikey: import.meta.env.VITE_YANDEX_API }}>
                <Card variant="outlined">
                    <Map
                        state={{ center: mapCenter, zoom: zoom }}
                        onBoundsChange={handleZoomChange}
                        width="100%"
                        height="100%"
                        onClick={handleMapClick}
                        className={styles.MapBlock}
                    >
                        {place?.latitude && place?.longitude && !isOpenNote && (
                            <Placemark
                                options={{ preset: getPlacemarkPreset(selectType, true) }}
                                geometry={[place.latitude, place.longitude]}
                                properties={{ hintContent: 'выбранное место', balloonContent: 'выбранное место' }}
                            />
                        )}
                        {userLocation[0] && userLocation[1] && (
                            <Placemark
                                options={{ preset: 'islands#redIcon' }}
                                geometry={userLocation}
                            />
                        )}
                        {userLocation[0] && userLocation[1] && radius && (
                            <Circle
                                geometry={[userLocation, radius]}
                                options={{
                                    fillColor: '#1976D260',
                                    strokeColor: '#1976D2',
                                    strokeOpacity: 0.7,
                                    strokeWidth: 3,
                                }}
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
                            }}
                            clusters={{
                                preset: 'islands#nightClusterIcons',
                            }}
                            features={transformedFeatures}
                            onClick={handleObjectClick}
                        />
                    </Map>
                </Card>
            </YMaps>
        </div>
    );
};

export default withLoading(MapYandex);
