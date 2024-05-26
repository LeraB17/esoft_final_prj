import { FC, useEffect, useState } from 'react';
import MarkerUI from '#components/UI/MarkerUI/MarkerUI';
import { LatLngType } from '#interfaces/MapTypes';
import { Popup, useMapEvents } from 'react-leaflet';
import { Colors } from '#components/UI/MarkerUI/IMarkerUIProps';

const lat = 57.15;
const lng = 65.54;

const CurrentLocationMarker: FC = () => {
    const [position, setPosition] = useState<LatLngType>({ lat: lat, lng: lng });

    const map = useMapEvents({
        locationfound(e) {
            setPosition(e.latlng);
        },
    });

    useEffect(() => {
        map.locate();
    }, [map]);

    useEffect(() => {
        map.flyTo(position, map.getZoom());
    }, [map, position]);

    return position === null ? null : (
        <MarkerUI
            position={position}
            color={Colors.Red}
        >
            <Popup>You are here</Popup>
        </MarkerUI>
    );
};

export default CurrentLocationMarker;
