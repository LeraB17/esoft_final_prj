import { FC } from 'react';
import styles from './Map.module.scss';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import CurrentLocationMarker from '#components/CurrentLocationMarker/CurrentLocationMarker';
import MarkerUI from '#components/UI/MarkerUI/MarkerUI';
import MapClickHandler from '#components/MapClickHandler/MapClickHandler';
import { useAppSelector } from '#hooks/redux';

const Map: FC = () => {
    const { coordinates } = useAppSelector((state) => state.note);

    return (
        <div>
            <MapContainer
                center={[coordinates.lat, coordinates.lng]}
                zoom={13}
                className={styles.Map}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapClickHandler />
                {coordinates && <MarkerUI position={coordinates} />}
                <CurrentLocationMarker />
            </MapContainer>
        </div>
    );
};

export default Map;
