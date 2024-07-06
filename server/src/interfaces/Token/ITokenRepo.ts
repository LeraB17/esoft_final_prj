import { IToken } from './IToken';
import { IDType } from '../types';

export interface ITokenRepo {
    tableName: string;
    save: (userId: IDType, refreshToken: string, fingerprint: string, expiresAt: Date) => Promise<IToken>;
    getByTokenData: (userId: IDType, refreshToken: string, fingerprint: string) => Promise<IToken | undefined>;
    delete: (userId: IDType, refreshToken: string) => Promise<IToken | undefined>;
}
