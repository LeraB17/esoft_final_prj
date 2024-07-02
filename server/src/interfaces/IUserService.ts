import { ITokenRepo } from './ITokenRepo';
import { IUser, PartialUserData, UserAuthData, UserData, UserWithoutPassword } from './IUser';
import { IUserRepo } from './IUserRepo';
import { IDType } from './types';

export interface IUserService {
    userRepo: IUserRepo;
    tokenRepo: ITokenRepo;
    getAll: () => Promise<UserWithoutPassword[]>;
    getById: (userId: IDType) => Promise<UserWithoutPassword | undefined>;
    getByNickName: (nickname: string) => Promise<UserWithoutPassword | undefined>;
    register: (data: UserData) => Promise<UserWithoutPassword>;
    generateTokens: (user: IUser | UserWithoutPassword) => any;
    login: (data: UserAuthData, fingerprint: string) => Promise<UserWithoutPassword | undefined>;
    refreshToken: (refreshToken: string, fingerprint: string) => Promise<any>;
    logout: (userId: IDType, refreshToken: string) => Promise<void>;
    update: (userId: IDType, data: PartialUserData) => Promise<UserWithoutPassword | undefined>;
    delete: (userId: IDType) => Promise<UserWithoutPassword | undefined>;
}
