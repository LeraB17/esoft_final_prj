import { IDType } from './types';
import { PlaceType } from './MapTypes';

export interface IPlace {
    id: IDType;
    latitude: number;
    longitude: number;
    name: string;
    type: PlaceType;
}

export type PlaceData = Omit<IPlace, 'id'>;
