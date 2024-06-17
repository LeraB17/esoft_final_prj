import { REFRESH_SESSION_DURATION_DAYS } from '../config/config';
import db from '../db/db';
import { IToken } from '../interfaces/IToken';
import { ITokenRepo } from '../interfaces/ITokenRepo';

class DbTokenRepo implements ITokenRepo {
    constructor() {}

    save = async (userId: number, refreshToken: string, fingerprint: string, expiresAt: Date): Promise<IToken> => {
        try {
            const sessions = await db('refresh_tokens').select('*').where('userId', userId);

            if (sessions.length >= 5) {
                await db('refresh_tokens').where({ userId }).delete();
            } else {
                await db('refresh_tokens').where({ userId, refreshToken, fingerprint }).delete().returning('*'); ///
            }

            const [newSession] = await db('refresh_tokens')
                .insert({
                    userId,
                    refreshToken,
                    fingerprint,
                    expiresAt: expiresAt,
                })
                .returning('*');

            return newSession;
        } catch (error) {
            console.error('Error refresh_tokens save:', error);
            throw new Error('Database error');
        }
    };

    getByTokenData = async (userId: number, refreshToken: string, fingerprint: string): Promise<IToken | undefined> => {
        try {
            const tokens = await db('refresh_tokens')
                .where({ userId: userId, refreshToken: refreshToken, fingerprint: fingerprint })
                .delete()
                .returning('*');

            if (!tokens) {
                return undefined;
            }

            const token = (tokens as unknown as IToken[])[0];

            if (token.expiresAt < new Date()) {
                return undefined;
            }

            return token;
        } catch (error) {
            console.error('Error refresh_tokens getByTokenData:', error);
            throw new Error('Database error');
        }
    };

    delete = async (userId: number, refreshToken: string): Promise<IToken | undefined> => {
        try {
            const [deleted] = await db('refresh_tokens')
                .where({ userId: userId, refreshToken: refreshToken })
                .delete()
                .returning('*');

            return deleted;
        } catch (error) {
            console.error('Error refresh_tokens delete:', error);
            throw new Error('Database error');
        }
    };
}

export default DbTokenRepo;
