import db from '../db/db';
import { IDType } from '../interfaces/types';
import { ISubscriptionRepo } from '../interfaces/ISubscriptionRepo';
import { ISubscription, ISubscriptionData } from '../interfaces/ISubscription';

class dbSubscriptionRepo implements ISubscriptionRepo {
    constructor(readonly tableName = 'subscriptions') {}

    getOne = async (userId: IDType, targetUserId: IDType): Promise<ISubscription | undefined> => {
        try {
            const subscription = await db.select('*').from<ISubscription>(this.tableName).where({ userId, targetUserId }).first();

            return subscription;
        } catch (error) {
            console.error(`Error ${this.tableName} getOne:`, error);
            throw new Error('Database error');
        }
    };

    getSubscriptionsByUserId = async (userId: IDType): Promise<ISubscriptionData[]> => {
        try {
            const subscriptions = await db(this.tableName)
                .select(
                    `${this.tableName}.*`,
                    db.raw("json_build_object('id', users.id, 'nickname', users.nickname, 'avatar', users.avatar")
                )
                .join('users', 'subscriptions.targetUserId', 'users.id')
                .where('subscriptions.userId', userId);

            return subscriptions;
        } catch (error) {
            console.error(`Error ${this.tableName} getSubscriptionsByUserId:`, error);
            throw new Error('Database error');
        }
    };

    getSubscribersByUserId = async (userId: IDType): Promise<ISubscriptionData[]> => {
        try {
            const subscriptions = await db(this.tableName)
                .select(
                    `${this.tableName}.*`,
                    db.raw("json_build_object('id', users.id, 'nickname', users.nickname, 'avatar', users.avatar")
                )
                .join('users', 'subscriptions.userId', 'users.id')
                .where('subscriptions.targetUserId', userId);

            return subscriptions;
        } catch (error) {
            console.error(`Error ${this.tableName} getSubscriptionsByUserId:`, error);
            throw new Error('Database error');
        }
    };

    create = async (userId: IDType, targetUserId: IDType): Promise<ISubscription> => {
        try {
            const [newSubscription] = await db(this.tableName)
                .insert({
                    userId,
                    targetUserId,
                })
                .returning('*');

            return newSubscription;
        } catch (error) {
            console.error(`Error ${this.tableName} create:`, error);
            throw new Error('Database error');
        }
    };

    delete = async (userId: IDType, targetUserId: IDType): Promise<ISubscription | undefined> => {
        try {
            const [deletedSubscription] = await db(this.tableName).where({ userId, targetUserId }).delete().returning('*');

            return deletedSubscription;
        } catch (error) {
            console.error(`Error ${this.tableName} delete:`, error);
            throw new Error('Database error');
        }
    };
}

export default dbSubscriptionRepo;
