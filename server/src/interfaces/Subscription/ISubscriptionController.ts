import { IUserService } from '../User/IUserService';
import { FuncType } from '../types';
import { ISubscriptionService } from './ISubscriptionService';

export interface ISubscriptionController {
    subscriptionService: ISubscriptionService;
    userService: IUserService;
    getSubscriptionsByUserId: FuncType;
    getSubscribersByUserId: FuncType;
    create: FuncType;
    delete: FuncType;
}
