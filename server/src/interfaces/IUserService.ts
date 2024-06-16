import { IUser, PartialUserData, UserAuthData, UserData, UserWithoutPassword } from './IUser';
import { IUserRepo } from './IUserRepo';

export interface IUserService {
    userRepo: IUserRepo;
    getAll: () => Promise<UserWithoutPassword[]>;
    getById: (userId: number) => Promise<UserWithoutPassword | undefined>;
    register: (data: UserData) => Promise<UserWithoutPassword>;
    login: (data: UserAuthData) => Promise<UserWithoutPassword | undefined>;
    logout: () => Promise<UserWithoutPassword | undefined>;
    update: (userId: number, data: PartialUserData) => Promise<UserWithoutPassword | undefined>;
    delete: (userId: number) => Promise<UserWithoutPassword | undefined>;
}
