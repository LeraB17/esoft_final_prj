import { LatLngType } from '#interfaces/MapTypes';
import { ReactNode } from 'react';

export enum Colors {
    Blue,
    Red,
}

export interface IMarkerUIProps {
    position: LatLngType;
    color?: Colors;
    children?: ReactNode;
}
