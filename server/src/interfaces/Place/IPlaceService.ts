import { IPlace, PartialPlaceData, PlaceData } from './IPlace';
import { IPlaceRepo } from './IPlaceRepo';
import { IDType } from '../types';
import { IUserService } from '../User/IUserService';

export interface IPlaceService {
    placeRepo: IPlaceRepo;
    userService: IUserService;
    getAll: () => Promise<IPlace[]>;
    getAllByUserId: (userId: IDType, targetUserId: IDType) => Promise<IPlace[]>;
    getById: (userId: IDType, placeId: IDType) => Promise<IPlace | undefined>;
    getByUserIdAndCoordinates: (userId: IDType, data: PlaceData) => Promise<IPlace | undefined>;
    create: (userId: IDType, data: PlaceData) => Promise<IPlace>;
    update: (userId: IDType, placeId: IDType, data: PartialPlaceData) => Promise<IPlace | undefined>;
    delete: (userId: IDType, placeId: IDType) => Promise<IPlace | undefined>;
}
