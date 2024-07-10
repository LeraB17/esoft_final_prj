import db from '../db/db';
import { IPlace, IPlaceStats, PartialPlaceData, PlaceData } from '../interfaces/Place/IPlace';
import { IPlaceRepo } from '../interfaces/Place/IPlaceRepo';
import { IDType } from '../interfaces/types';

class DbPlaceRepo implements IPlaceRepo {
    constructor(readonly tableName = 'places') {}

    getAll = async (): Promise<IPlace[]> => {
        try {
            const places = await db.select('*').from<IPlace>(this.tableName);

            return places;
        } catch (error) {
            console.error(`Error ${this.tableName} getAll:`, error);
            throw new Error('Database error');
        }
    };

    getAllByUserId = async (userId: IDType, targetUserId: IDType, statuses: IDType[]): Promise<IPlace[]> => {
        try {
            let query = db(this.tableName)
                .distinct()
                .select(`${this.tableName}.*`)
                .join('notes', 'notes.placeId', `${this.tableName}.id`)
                .where((builder) =>
                    builder.whereIn('notes.publicityStatusId', statuses).andWhere(`${this.tableName}.userId`, targetUserId)
                );

            if (userId === targetUserId) {
                query = query
                    .leftJoin('notes_shortcuts', 'notes_shortcuts.noteId', 'notes.id')
                    .orWhere('notes_shortcuts.userId', userId);
            }

            const places = await query.orderBy(`${this.tableName}.name`, 'asc');

            return places;
        } catch (error) {
            console.error(`Error ${this.tableName} getAllByUserId:`, error);
            throw new Error('Database error');
        }
    };

    getStatsByUserId = async (userId: IDType, targetUserId: IDType, statuses: IDType[]): Promise<IPlaceStats[]> => {
        try {
            let query = db(this.tableName)
                .distinct()
                .join('notes', 'notes.placeId', `${this.tableName}.id`)
                .where((builder) =>
                    builder.whereIn('notes.publicityStatusId', statuses).andWhere(`${this.tableName}.userId`, targetUserId)
                );

            if (userId === targetUserId) {
                query = query
                    .leftJoin('notes_shortcuts', 'notes_shortcuts.noteId', 'notes.id')
                    .orWhere('notes_shortcuts.userId', userId);
            }

            const places = await query
                .select('type')
                .count('* as count')
                .groupBy('type')
                .orderBy(`${this.tableName}.type`, 'asc');

            const formatted = places.map((row) => ({
                type: row.type as string,
                count: row.count as number,
            }));

            return formatted;
        } catch (error) {
            console.error(`Error ${this.tableName} getStatsByUserId:`, error);
            throw new Error('Database error');
        }
    };

    getById = async (userId: IDType, placeId: IDType): Promise<IPlace | undefined> => {
        try {
            const place = await db
                .select('*')
                .from<IPlace>(this.tableName)
                .where('userId', userId)
                .andWhere('id', placeId)
                .first();

            return place;
        } catch (error) {
            console.error(`Error ${this.tableName} getById:`, error);
            throw new Error('Database error');
        }
    };

    getByUserIdAndCoordinates = async (userId: IDType, latitude: number, longitude: number): Promise<IPlace | undefined> => {
        try {
            const place = await db
                .select('*')
                .from<IPlace>(this.tableName)
                .where('userId', userId)
                .andWhere('latitude', latitude)
                .andWhere('longitude', longitude)
                .first();

            return place;
        } catch (error) {
            console.error(`Error ${this.tableName} getByUserIdAndCoordinates:`, error);
            throw new Error('Database error');
        }
    };

    create = async (userId: IDType, data: PlaceData): Promise<IPlace> => {
        try {
            const [newPlace] = await db(this.tableName)
                .insert({
                    userId: userId,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    name: data.name,
                    type: data.type,
                })
                .returning('*');

            return newPlace;
        } catch (error) {
            console.error(`Error ${this.tableName} create:`, error);
            throw new Error('Database error');
        }
    };

    update = async (userId: IDType, placeId: IDType, data: PartialPlaceData): Promise<IPlace | undefined> => {
        try {
            const [updatedPlace] = await db(this.tableName)
                .where('userId', userId)
                .andWhere('id', placeId)
                .update(data)
                .returning('*');

            return updatedPlace;
        } catch (error) {
            console.error(`Error ${this.tableName} update:`, error);
            throw new Error('Database error');
        }
    };

    delete = async (userId: IDType, placeId: IDType): Promise<IPlace | undefined> => {
        try {
            const [deletedPlace] = await db(this.tableName)
                .where('userId', userId)
                .andWhere('id', placeId)
                .delete()
                .returning('*');

            return deletedPlace;
        } catch (error) {
            console.error(`Error ${this.tableName} delete:`, error);
            throw new Error('Database error');
        }
    };
}

export default DbPlaceRepo;
