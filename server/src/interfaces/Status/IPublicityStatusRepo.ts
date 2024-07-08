import { IPublicityStatus, PublicityStatusData } from './IPublicityStatus';
import { IDType } from '../types';

export interface IPublicityStatusRepo {
    tableName: string;
    getAll: () => Promise<IPublicityStatus[]>;
    getById: (statusId: IDType) => Promise<IPublicityStatus | undefined>;
    create: (data: PublicityStatusData) => Promise<IPublicityStatus>;
    update: (statusId: IDType, data: PublicityStatusData) => Promise<IPublicityStatus | undefined>;
    delete: (statusId: IDType) => Promise<IPublicityStatus | undefined>;
}
