import { FC } from 'react';
import { useMapEvents } from 'react-leaflet';
import { IMapClickHandlerProps } from './IMapClickHandlerProps';

const MapClickHandler: FC<IMapClickHandlerProps> = ({ setMarkerPosition }) => {
    useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;
            setMarkerPosition({ lat, lng });
        },
    });
    return null;
};

export default MapClickHandler;
