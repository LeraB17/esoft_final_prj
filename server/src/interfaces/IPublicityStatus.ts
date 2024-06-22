import { IDType } from './types';

export interface IPublicityStatus {
    id: IDType;
    statusName: string;
}

export type PublicityStatusData = Omit<IPublicityStatus, 'id'>;
