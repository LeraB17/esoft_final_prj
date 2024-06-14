export interface IPlace {
    id: number;
    userId: number;
    latitude: number;
    longitude: number;
}

export type PlaceData = Omit<IPlace, 'id' | 'userId'>;
export type PartialPlaceData = Partial<PlaceData>;
