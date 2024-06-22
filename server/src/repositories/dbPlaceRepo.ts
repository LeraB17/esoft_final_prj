import db from '../db/db';
import { IPlace, PartialPlaceData, PlaceData } from '../interfaces/IPlace';
import { IPlaceRepo } from '../interfaces/IPlaceRepo';
import { IDType } from '../interfaces/types';

class DbPlaceRepo implements IPlaceRepo {
    constructor() {}

    getAll = async (): Promise<IPlace[]> => {
        try {
            const places = await db.select('*').from<IPlace>('places');

            return places;
        } catch (error) {
            console.error('Error places getAll:', error);
            throw new Error('Database error');
        }
    };

    getAllByUserId = async (userId: IDType): Promise<IPlace[]> => {
        try {
            const places = await db.select('*').from<IPlace>('places').where('userId', userId);

            return places;
        } catch (error) {
            console.error('Error places getAllByUserId:', error);
            throw new Error('Database error');
        }
    };

    getById = async (userId: IDType, placeId: IDType): Promise<IPlace | undefined> => {
        try {
            const place = await db.select('*').from<IPlace>('places').where('userId', userId).andWhere('id', placeId).first();

            return place;
        } catch (error) {
            console.error('Error places getById:', error);
            throw new Error('Database error');
        }
    };

    getByUserIdAndCoordinates = async (userId: IDType, latitude: number, longitude: number): Promise<IPlace | undefined> => {
        try {
            console.log('latitude', latitude);
            console.log('longitude', longitude);
            const place = await db
                .select('*')
                .from<IPlace>('places')
                .where('userId', userId)
                .andWhere('latitude', latitude)
                .andWhere('longitude', longitude)
                .first();

            return place;
        } catch (error) {
            console.error('Error places getByUserIdAndCoordinates:', error);
            throw new Error('Database error');
        }
    };

    create = async (userId: IDType, data: PlaceData): Promise<IPlace> => {
        try {
            const [newPlace] = await db('places')
                .insert({
                    userId: userId,
                    latitude: data.lat,
                    longitude: data.lng,
                    name: data.name,
                })
                .returning('*');

            return newPlace;
        } catch (error) {
            console.error('Error places create:', error);
            throw new Error('Database error');
        }
    };

    update = async (userId: IDType, placeId: IDType, data: PartialPlaceData): Promise<IPlace | undefined> => {
        try {
            const [updatedPlace] = await db('places').where('userId', userId).andWhere('id', placeId).update(data).returning('*');

            return updatedPlace;
        } catch (error) {
            console.error('Error places update:', error);
            throw new Error('Database error');
        }
    };

    delete = async (userId: IDType, placeId: IDType): Promise<IPlace | undefined> => {
        try {
            const [deletedPlace] = await db('places').where('userId', userId).andWhere('id', placeId).delete().returning('*');

            return deletedPlace;
        } catch (error) {
            console.error('Error places delete:', error);
            throw new Error('Database error');
        }
    };
}

export default DbPlaceRepo;
