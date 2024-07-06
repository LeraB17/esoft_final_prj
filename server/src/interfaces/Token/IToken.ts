import { IDType } from '../types';

export interface IToken {
    id: IDType;
    userId: IDType;
    refreshToken: string;
    fingerprint: string;
    expiresAt: Date;
    createdAt: Date;
}

export type TokenData = Omit<IToken, 'id' | 'expiresIn' | 'createdAt'>;
