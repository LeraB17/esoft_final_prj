import { IPlace, PartialPlaceData, PlaceData } from './IPlace';
import { IPlaceRepo } from './IPlaceRepo';

export interface IPlaceService {
    placeRepo: IPlaceRepo;
    getAll: () => Promise<IPlace[]>;
    getAllByUserId: (userId: number) => Promise<IPlace[]>;
    getById: (userId: number, placeId: number) => Promise<IPlace | undefined>;
    getByUserIdAndCoordinates: (userId: number, data: PlaceData) => Promise<IPlace | undefined>;
    create: (userId: number, data: PlaceData) => Promise<IPlace>;
    update: (userId: number, placeId: number, data: PartialPlaceData) => Promise<IPlace | undefined>;
    delete: (userId: number, placeId: number) => Promise<IPlace | undefined>;
}
