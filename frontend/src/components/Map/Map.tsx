import { FC, useState } from 'react';
import styles from './Map.module.scss';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngType } from '#interfaces/MapTypes';
import CurrentLocationMarker from '#components/CurrentLocationMarker/CurrentLocationMarker';
import MarkerUI from '#components/UI/MarkerUI/MarkerUI';
import MapClickHandler from '#components/MapClickHandler/MapClickHandler';

const lat = 57.15;
const lng = 65.54;

const Map: FC = () => {
    const [markerPosition, setMarkerPosition] = useState<LatLngType>({ lat: lat, lng: lng });

    return (
        <div>
            {markerPosition && (
                <div>
                    <p>Latitude: {markerPosition.lat}</p>
                    <p>Longitude: {markerPosition.lng}</p>
                </div>
            )}
            <MapContainer
                center={[lat, lng]}
                zoom={13}
                className={styles.Map}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapClickHandler setMarkerPosition={setMarkerPosition} />
                {markerPosition && <MarkerUI position={markerPosition} />}
                <CurrentLocationMarker />
            </MapContainer>
        </div>
    );
};

export default Map;
