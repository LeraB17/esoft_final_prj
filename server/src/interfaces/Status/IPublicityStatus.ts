import { IDType } from '../types';

export interface IPublicityStatus {
    id: IDType;
    name: string;
}

export type PublicityStatusData = Omit<IPublicityStatus, 'id'>;
