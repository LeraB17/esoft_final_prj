import { IToken } from './IToken';

export interface ITokenRepo {
    save: (userId: number, refreshToken: string, fingerprint: string, expiresAt: Date) => Promise<IToken>;
    getByTokenData: (userId: number, refreshToken: string, fingerprint: string) => Promise<IToken | undefined>;
    delete: (userId: number, refreshToken: string) => Promise<IToken | undefined>;
}
