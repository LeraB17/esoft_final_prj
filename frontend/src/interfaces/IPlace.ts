import { IDType } from './types';

export interface IPlace {
    id: IDType;
    lat: number;
    lng: number;
    name: string;
}

export type PlaceData = Omit<IPlace, 'id'>;
