import { IDType } from './types';

export interface IPlace {
    id: IDType;
    latitude: number;
    longitude: number;
    name: string;
}

export type PlaceData = Omit<IPlace, 'id'>;
