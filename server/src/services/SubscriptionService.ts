import { ISubscription, ISubscriptionData } from '../interfaces/Subscription/ISubscription';
import { ISubscriptionRepo } from '../interfaces/Subscription/ISubscriptionRepo';
import { ISubscriptionService } from '../interfaces/Subscription/ISubscriptionService';
import { IDType } from '../interfaces/types';

class SubscriptionService implements ISubscriptionService {
    constructor(readonly subscriptionRepo: ISubscriptionRepo) {}

    getOne = async (userId: IDType, targetUserId: IDType): Promise<ISubscription | undefined> => {
        return this.subscriptionRepo.getOne(userId, targetUserId);
    };

    getSubscriptionsByUserId = async (userId: IDType): Promise<ISubscriptionData[]> => {
        return this.subscriptionRepo.getSubscriptionsByUserId(userId);
    };

    getSubscribersByUserId = async (userId: IDType): Promise<ISubscriptionData[]> => {
        return this.subscriptionRepo.getSubscribersByUserId(userId);
    };

    create = async (userId: IDType, targetUserId: IDType): Promise<ISubscription> => {
        return this.subscriptionRepo.create(userId, targetUserId);
    };

    delete = async (userId: IDType, targetUserId: IDType): Promise<ISubscription | undefined> => {
        return this.subscriptionRepo.delete(userId, targetUserId);
    };
}

export default SubscriptionService;
