import { IUser, UserAuthData, UserData, UserWithoutPassword } from '../User/IUser';
import { ITokenRepo } from '../Token/ITokenRepo';
import { IUserService } from '../User/IUserService';
import { IDType } from '../types';
import { TokensType } from './IAuthData';

export interface IAuthService {
    tokenRepo: ITokenRepo;
    userService: IUserService;
    register: (data: UserData) => Promise<UserWithoutPassword>;
    generateTokens: (user: IUser | UserWithoutPassword) => any;
    login: (data: UserAuthData, fingerprint: string) => Promise<UserWithoutPassword | undefined>;
    refreshToken: (refreshToken: string, fingerprint: string) => Promise<TokensType>;
    logout: (userId: IDType, refreshToken: string) => Promise<void>;
}
