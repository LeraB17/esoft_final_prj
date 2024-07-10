import { IPlace, IPlaceStats, PartialPlaceData, PlaceData } from '../interfaces/Place/IPlace';
import { IPlaceRepo } from '../interfaces/Place/IPlaceRepo';
import { IPlaceService } from '../interfaces/Place/IPlaceService';
import { IUserService } from '../interfaces/User/IUserService';
import { IDType } from '../interfaces/types';

class PlaceService implements IPlaceService {
    constructor(readonly placeRepo: IPlaceRepo, readonly userService: IUserService) {}

    getAll = async (): Promise<IPlace[]> => {
        return this.placeRepo.getAll();
    };

    getAllByUserId = async (userId: IDType, targetUserId: IDType): Promise<IPlace[]> => {
        const statuses = await this.userService.getPublicityStatusesForUser(userId, targetUserId);
        return this.placeRepo.getAllByUserId(userId, targetUserId, statuses);
    };

    getStatsByUserId = async (userId: IDType, targetUserId: IDType): Promise<IPlaceStats[]> => {
        const statuses = await this.userService.getPublicityStatusesForUser(userId, targetUserId);
        return this.placeRepo.getStatsByUserId(userId, targetUserId, statuses);
    };

    getById = async (userId: IDType, placeId: IDType): Promise<IPlace | undefined> => {
        return this.placeRepo.getById(userId, placeId);
    };

    getByUserIdAndCoordinates = async (userId: IDType, data: PlaceData): Promise<IPlace | undefined> => {
        return this.placeRepo.getByUserIdAndCoordinates(userId, data.latitude, data.longitude);
    };

    create = async (userId: IDType, data: PlaceData): Promise<IPlace> => {
        return this.placeRepo.create(userId, data);
    };

    update = async (userId: IDType, placeId: IDType, data: PartialPlaceData): Promise<IPlace | undefined> => {
        return this.placeRepo.update(userId, placeId, data);
    };

    delete = async (userId: IDType, placeId: IDType): Promise<IPlace | undefined> => {
        return this.placeRepo.delete(userId, placeId);
    };
}

export default PlaceService;
