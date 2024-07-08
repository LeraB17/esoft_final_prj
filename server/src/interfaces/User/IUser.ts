import { IDType } from '../types';

export interface IUser {
    id: IDType;
    nickname: string;
    email: string;
    password: string;
    avatar: string | null;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    tokens?: {
        accessToken: string;
        refreshToken: string;
    };
    isSubscribed: boolean;
}

export type IUserAuthor = Pick<IUser, 'id' | 'nickname' | 'avatar'>;

export type UserData = Omit<IUser, 'id' | 'role' | 'createdAt' | 'updatedAt'>;
export type UserWithoutPassword = Omit<IUser, 'password'>;
export type UserAuthData = Omit<UserData, 'avatar' | 'nickname' | 'token'>;
export type PartialUserData = Partial<Pick<UserData, 'nickname' | 'email' | 'avatar'>> &
    Pick<UserData, 'password'> & { newPassword?: string; updatedAt: Date };

export type UserDeleteData = Pick<UserData, 'password'>;
