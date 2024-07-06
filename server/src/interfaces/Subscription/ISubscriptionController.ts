import { FuncType } from './INoteController';
import { ISubscriptionService } from './ISubscriptionService';

export interface ISubscriptionController {
    subscriptionService: ISubscriptionService;
    getSubscriptionsByUserId: FuncType;
    getSubscribersByUserId: FuncType;
    create: FuncType;
    delete: FuncType;
}
