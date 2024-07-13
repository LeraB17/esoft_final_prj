import { IPublicityStatus, PublicityStatusData } from './IPublicityStatus';
import { IPublicityStatusRepo } from './IPublicityStatusRepo';
import { IDType } from '../types';

export interface IPublicityStatusService {
    publicityStatusRepo: IPublicityStatusRepo;
    getAll: () => Promise<IPublicityStatus[]>;
    getById: (statusId: IDType) => Promise<IPublicityStatus | undefined>;
    create: (data: PublicityStatusData) => Promise<IPublicityStatus>;
    update: (statusId: IDType, data: PublicityStatusData) => Promise<IPublicityStatus | undefined>;
    delete: (statusId: IDType) => Promise<IPublicityStatus | undefined>;
}
