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
}
