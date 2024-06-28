import { IDType } from './types';

export interface IPlace {
    id: IDType;
    userId: IDType;
    latitude: number;
    longitude: number;
    name: string;
}

export type PlaceData = Omit<IPlace, 'id' | 'userId'>;
export type PartialPlaceData = Partial<PlaceData>;
