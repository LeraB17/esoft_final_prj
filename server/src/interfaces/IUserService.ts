import { ITokenRepo } from './ITokenRepo';
import { IUser, PartialUserData, UserAuthData, UserData, UserWithoutPassword } from './IUser';
import { IUserRepo } from './IUserRepo';

export interface IUserService {
    userRepo: IUserRepo;
    tokenRepo: ITokenRepo;
    getAll: () => Promise<UserWithoutPassword[]>;
    getById: (userId: number) => Promise<UserWithoutPassword | undefined>;
    register: (data: UserData) => Promise<UserWithoutPassword>;
    generateTokens: (user: IUser | UserWithoutPassword) => any;
    login: (data: UserAuthData, fingerprint: string) => Promise<UserWithoutPassword | undefined>;
    refreshToken: (refreshToken: string, fingerprint: string) => Promise<any>;
    logout: (userId: number, refreshToken: string) => Promise<void>;
    update: (userId: number, data: PartialUserData) => Promise<UserWithoutPassword | undefined>;
    delete: (userId: number) => Promise<UserWithoutPassword | undefined>;
}
