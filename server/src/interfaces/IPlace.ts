import { IDType } from './types';

export interface IPlace {
    id: IDType;
    userId: IDType;
    lat: number;
    lng: number;
    name: string;
}

export type PlaceData = Omit<IPlace, 'id' | 'userId'>;
export type PartialPlaceData = Partial<PlaceData>;
