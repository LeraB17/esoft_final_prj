import { IUser, PartialUserData, UserData, UserWithoutPassword } from '../interfaces/IUser';
import { IUserRepo } from '../interfaces/IUserRepo';
import { IUserService } from '../interfaces/IUserService';
import { IDType } from '../interfaces/types';
import { ISubscriptionService } from '../interfaces/ISubscriptionService';

class UserService implements IUserService {
    constructor(readonly userRepo: IUserRepo, readonly subscriptionService: ISubscriptionService) {}

    getAll = async (): Promise<UserWithoutPassword[]> => {
        return this.userRepo.getAll();
    };

    getById = async (targetUserId: IDType, userId?: IDType): Promise<UserWithoutPassword | undefined> => {
        const user = this.userRepo.getById(targetUserId);
        if (!user) {
            return undefined;
        }

        if (!userId) {
            return user;
        }

        const subscription = await this.subscriptionService.getOne(userId, targetUserId);
        const result = { ...user, isSubscribed: !!subscription };

        return result;
    };

    getByNickName = async (nickname: string, userId?: IDType): Promise<UserWithoutPassword | undefined> => {
        const user = await this.userRepo.getByNickname(nickname);
        if (!user) {
            return undefined;
        }

        if (!userId) {
            return user;
        }

        const subscription = await this.subscriptionService.getOne(userId, user.id);
        const result = { ...user, isSubscribed: !!subscription };

        return result;
    };

    getByEmail = async (email: string, userId?: IDType): Promise<IUser | undefined> => {
        const user = await this.userRepo.getByEmail(email);
        if (!user) {
            return undefined;
        }

        if (!userId) {
            return user;
        }

        const subscription = await this.subscriptionService.getOne(userId, user.id);
        const result = { ...user, isSubscribed: !!subscription };

        return result;
    };

    create = async (data: UserData): Promise<UserWithoutPassword> => {
        return this.userRepo.create(data);
    };

    update = async (userId: IDType, data: PartialUserData): Promise<UserWithoutPassword | undefined> => {
        return this.userRepo.update(userId, data);
    };

    delete = async (userId: IDType): Promise<UserWithoutPassword | undefined> => {
        return this.userRepo.delete(userId);
    };
}

export default UserService;
