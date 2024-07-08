import { IDType } from './types';

export interface IUser {
    id: IDType;
    nickname: string;
    email: string;
    avatar: string;
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

export interface IUserRes {
    message: string;
    tokens?: {
        accessToken: string;
        refreshToken: string;
    };
}

export interface IUserRegisterRes {
    message: string;
    user: IUser;
}
