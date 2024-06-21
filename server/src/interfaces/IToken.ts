export interface IToken {
    id: number;
    userId: number;
    refreshToken: string;
    fingerprint: string;
    expiresAt: Date;
    createdAt: Date;
}

export type TokenData = Omit<IToken, 'id' | 'expiresIn' | 'createdAt'>;
