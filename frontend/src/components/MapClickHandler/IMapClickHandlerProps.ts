import { LatLngType } from '#interfaces/MapTypes';
import { Dispatch, SetStateAction } from 'react';

export interface IMapClickHandlerProps {
    setMarkerPosition: Dispatch<SetStateAction<LatLngType>>;
}
