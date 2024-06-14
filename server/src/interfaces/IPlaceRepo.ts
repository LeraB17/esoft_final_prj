import { IPlace, PartialPlaceData, PlaceData } from './IPlace';

export interface IPlaceRepo {
    getAll: () => Promise<IPlace[]>;
    getAllByUserId: (userId: number) => Promise<IPlace[]>;
    getById: (userId: number, placeId: number) => Promise<IPlace | undefined>;
    getByUserIdAndCoordinates: (userId: number, latitude: number, longitude: number) => Promise<IPlace | undefined>;
    create: (userId: number, data: PlaceData) => Promise<IPlace>;
    update: (userId: number, placeId: number, data: PartialPlaceData) => Promise<IPlace | undefined>;
    delete: (userId: number, placeId: number) => Promise<IPlace | undefined>;
}
