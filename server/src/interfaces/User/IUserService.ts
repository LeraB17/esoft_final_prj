import { IUser, PartialUserData, UserData, UserWithoutPassword } from './IUser';
import { IUserRepo } from './IUserRepo';
import { IDType } from '../types';
import { ISubscriptionService } from '../Subscription/ISubscriptionService';

export interface IUserService {
    userRepo: IUserRepo;
    subscriptionService: ISubscriptionService;

    getAll: () => Promise<UserWithoutPassword[]>;
    getById: (targetUserId: IDType, userId?: IDType) => Promise<UserWithoutPassword | undefined>;
    getByNickName: (nickname: string, userId?: IDType) => Promise<UserWithoutPassword | undefined>;
    getByEmail: (email: string, userId?: IDType) => Promise<IUser | undefined>;
    create: (data: UserData) => Promise<UserWithoutPassword>;
    update: (userId: IDType, data: PartialUserData) => Promise<UserWithoutPassword | undefined>;
    delete: (userId: IDType) => Promise<UserWithoutPassword | undefined>;
}
