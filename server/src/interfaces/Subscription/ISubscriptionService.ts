import { ISubscription, ISubscriptionData } from './ISubscription';
import { ISubscriptionRepo } from './ISubscriptionRepo';
import { IDType } from '../types';

export interface ISubscriptionService {
    subscriptionRepo: ISubscriptionRepo;
    getOne: (userId: IDType, targetUserId: IDType) => Promise<ISubscription | undefined>;
    getSubscriptionsByUserId: (userId: IDType) => Promise<ISubscriptionData[]>;
    getSubscribersByUserId: (userId: IDType) => Promise<ISubscriptionData[]>;
    create: (userId: IDType, targetUserId: IDType) => Promise<ISubscription>;
    delete: (userId: IDType, targetUserId: IDType) => Promise<ISubscription | undefined>;
}
