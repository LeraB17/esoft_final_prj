import { IPlace, PartialPlaceData, PlaceData } from '../interfaces/IPlace';
import { IPlaceRepo } from '../interfaces/IPlaceRepo';
import { IPlaceService } from '../interfaces/IPlaceService';
import { IUserService } from '../interfaces/IUserService';
import { IDType } from '../interfaces/types';

class PlaceService implements IPlaceService {
    constructor(readonly placeRepo: IPlaceRepo, readonly userService: IUserService) {}

    getAll = async (): Promise<IPlace[]> => {
        return this.placeRepo.getAll();
    };

    getAllByUserId = async (userId: IDType, targetUserName: string): Promise<IPlace[]> => {
        const targetUser = await this.userService.getByNickName(targetUserName);
        if (!targetUser) {
            throw new Error('User not found');
        }
        return this.placeRepo.getAllByUserId(userId, targetUser.id);
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
