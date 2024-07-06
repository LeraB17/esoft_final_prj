import { ITokenRepo } from './ITokenRepo';
import { IUser, UserAuthData, UserData, UserWithoutPassword } from './IUser';
import { IUserService } from './IUserService';
import { IDType } from './types';

export interface IAuthService {
    tokenRepo: ITokenRepo;
    userService: IUserService;
    register: (data: UserData) => Promise<UserWithoutPassword>;
    generateTokens: (user: IUser | UserWithoutPassword) => any;
    login: (data: UserAuthData, fingerprint: string) => Promise<UserWithoutPassword | undefined>;
    refreshToken: (refreshToken: string, fingerprint: string) => Promise<any>;
    logout: (userId: IDType, refreshToken: string) => Promise<void>;
}
