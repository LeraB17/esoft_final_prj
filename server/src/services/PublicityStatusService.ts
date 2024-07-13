import { IPublicityStatus, PublicityStatusData } from '../interfaces/Status/IPublicityStatus';
import { IPublicityStatusRepo } from '../interfaces/Status/IPublicityStatusRepo';
import { IPublicityStatusService } from '../interfaces/Status/IPublicityStatusService';
import { IDType } from '../interfaces/types';

class PublicityStatusService implements IPublicityStatusService {
    constructor(readonly publicityStatusRepo: IPublicityStatusRepo) {}

    getAll = async (): Promise<IPublicityStatus[]> => {
        return this.publicityStatusRepo.getAll();
    };

    getById = async (statusId: IDType): Promise<IPublicityStatus | undefined> => {
        return this.publicityStatusRepo.getById(statusId);
    };

    create = async (data: PublicityStatusData): Promise<IPublicityStatus> => {
        return this.publicityStatusRepo.create(data);
    };

    update = async (statusId: IDType, data: PublicityStatusData): Promise<IPublicityStatus | undefined> => {
        return this.publicityStatusRepo.update(statusId, data);
    };

    delete = async (statusId: IDType): Promise<IPublicityStatus | undefined> => {
        return this.publicityStatusRepo.delete(statusId);
    };
}

export default PublicityStatusService;
