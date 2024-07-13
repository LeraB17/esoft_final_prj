import { ISubscription, ISubscriptionData } from './ISubscription';
import { IDType } from '../types';

export interface ISubscriptionRepo {
    tableName: string;
    getOne: (userId: IDType, targetUserId: IDType) => Promise<ISubscription | undefined>;
    getSubscriptionsByUserId: (userId: IDType) => Promise<ISubscriptionData[]>;
    getSubscribersByUserId: (userId: IDType) => Promise<ISubscriptionData[]>;
    create: (userId: IDType, targetUserId: IDType) => Promise<ISubscription>;
    delete: (userId: IDType, targetUserId: IDType) => Promise<ISubscription | undefined>;
}
