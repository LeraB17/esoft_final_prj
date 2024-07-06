import db from '../db/db';
import { IToken } from '../interfaces/Token/IToken';
import { ITokenRepo } from '../interfaces/Token/ITokenRepo';
import { IDType } from '../interfaces/types';

class DbTokenRepo implements ITokenRepo {
    constructor(readonly tableName = 'refresh_tokens') {}

    save = async (userId: IDType, refreshToken: string, fingerprint: string, expiresAt: Date): Promise<IToken> => {
        try {
            const sessions = await db(this.tableName).select('*').where('userId', userId);

            if (sessions.length >= 5) {
                await db(this.tableName).where({ userId }).delete();
            } else {
                await db(this.tableName).where({ userId, refreshToken, fingerprint }).delete().returning('*'); ///
            }

            const [newSession] = await db(this.tableName)
                .insert({
                    userId,
                    refreshToken,
                    fingerprint,
                    expiresAt: expiresAt,
                })
                .returning('*');

            return newSession;
        } catch (error) {
            console.error(`Error ${this.tableName} save:`, error);
            throw new Error('Database error');
        }
    };

    getByTokenData = async (userId: IDType, refreshToken: string, fingerprint: string): Promise<IToken | undefined> => {
        try {
            const tokens = await db(this.tableName)
                .where({ userId: userId, refreshToken: refreshToken, fingerprint: fingerprint })
                .delete()
                .returning('*');

            if (tokens.length === 0) {
                return undefined;
            }

            const token = (tokens as unknown as IToken[])[0];

            if (token && token.expiresAt < new Date()) {
                return undefined;
            }

            return token;
        } catch (error) {
            console.error(`Error ${this.tableName} getByTokenData:`, error);
            throw new Error('Database error');
        }
    };

    delete = async (userId: IDType, refreshToken: string): Promise<IToken | undefined> => {
        try {
            const [deleted] = await db(this.tableName)
                .where({ userId: userId, refreshToken: refreshToken })
                .delete()
                .returning('*');

            return deleted;
        } catch (error) {
            console.error(`Error ${this.tableName} delete:`, error);
            throw new Error('Database error');
        }
    };
}

export default DbTokenRepo;
