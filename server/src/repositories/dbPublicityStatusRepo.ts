import db from '../db/db';
import { IDType } from '../interfaces/types';
import { IPublicityStatusRepo } from '../interfaces/Status/IPublicityStatusRepo';
import { IPublicityStatus, PublicityStatusData } from '../interfaces/Status/IPublicityStatus';

class DbPublicityStatusRepo implements IPublicityStatusRepo {
    constructor(readonly tableName = 'publicity_statuses') {}

    getAll = async (): Promise<IPublicityStatus[]> => {
        try {
            const statuses = await db.select('*').from<IPublicityStatus>(this.tableName);

            return statuses;
        } catch (error) {
            console.error(`Error ${this.tableName} getAll:`, error);
            throw new Error('Database error');
        }
    };

    getById = async (statusId: IDType): Promise<IPublicityStatus | undefined> => {
        try {
            const status = await db.select('*').from<IPublicityStatus>(this.tableName).where('id', statusId).first();

            return status;
        } catch (error) {
            console.error(`Error ${this.tableName} getById:`, error);
            throw new Error('Database error');
        }
    };

    create = async (data: PublicityStatusData): Promise<IPublicityStatus> => {
        try {
            const [newStatus] = await db(this.tableName)
                .insert({
                    name: data.statusName,
                })
                .returning('*');

            return newStatus;
        } catch (error) {
            console.error(`Error ${this.tableName} create:`, error);
            throw new Error('Database error');
        }
    };

    update = async (statusId: IDType, data: PublicityStatusData): Promise<IPublicityStatus | undefined> => {
        try {
            const [updatedStatus] = await db(this.tableName).andWhere('id', statusId).update(data).returning('*');

            return updatedStatus;
        } catch (error) {
            console.error(`Error ${this.tableName} update:`, error);
            throw new Error('Database error');
        }
    };

    delete = async (statusId: IDType): Promise<IPublicityStatus | undefined> => {
        try {
            const [deletedStatus] = await db(this.tableName).andWhere('id', statusId).delete().returning('*');

            return deletedStatus;
        } catch (error) {
            console.error(`Error ${this.tableName} delete:`, error);
            throw new Error('Database error');
        }
    };
}

export default DbPublicityStatusRepo;
