import { IDType } from './types';

export interface IUser {
    id: IDType;
    nickname: string;
    email: string;
    password: string;
    avatar: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    tokens?: {
        accessToken: string;
        refreshToken: string;
    };
}

export type UserData = Omit<IUser, 'id' | 'role' | 'createdAt' | 'updatedAt'>;
export type UserWithoutPassword = Omit<IUser, 'password'>;
export type UserAuthData = Omit<UserData, 'avatar' | 'nickname' | 'token'>;
export type PartialUserData = Partial<UserData>;
