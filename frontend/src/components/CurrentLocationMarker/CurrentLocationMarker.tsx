import { FC, useEffect, useState } from 'react';
import MarkerUI from '#components/UI/MarkerUI/MarkerUI';
import { LatLngType } from '#interfaces/MapTypes';
import { Popup, useMapEvents } from 'react-leaflet';
import { Colors } from '#components/UI/MarkerUI/IMarkerUIProps';
import { useAppSelector } from '#hooks/redux';

const CurrentLocationMarker: FC = () => {
    const { coordinates } = useAppSelector((state) => state.note);
    const [position, setPosition] = useState<LatLngType>(coordinates);

    const map = useMapEvents({
        locationfound(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    useEffect(() => {
        map.locate();
    }, [map]);

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
