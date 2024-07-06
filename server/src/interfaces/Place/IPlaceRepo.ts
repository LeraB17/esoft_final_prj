import { IPlace, PartialPlaceData, PlaceData } from './IPlace';
import { IDType } from '../types';

export interface IPlaceRepo {
    tableName: string;
    getAll: () => Promise<IPlace[]>;
    getAllByUserId: (userId: IDType, targetUserId: IDType) => Promise<IPlace[]>;
    getById: (userId: IDType, placeId: IDType) => Promise<IPlace | undefined>;
    getByUserIdAndCoordinates: (userId: IDType, latitude: IDType, longitude: IDType) => Promise<IPlace | undefined>;
    create: (userId: IDType, data: PlaceData) => Promise<IPlace>;
    update: (userId: IDType, placeId: IDType, data: PartialPlaceData) => Promise<IPlace | undefined>;
    delete: (userId: IDType, placeId: IDType) => Promise<IPlace | undefined>;
}
