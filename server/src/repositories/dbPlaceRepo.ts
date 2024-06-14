import db from '../db/db';
import { IPlace, PartialPlaceData, PlaceData } from '../interfaces/IPlace';
import { IPlaceRepo } from '../interfaces/IPlaceRepo';

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

    getAllByUserId = async (userId: number): Promise<IPlace[]> => {
        try {
            const places = await db.select('*').from<IPlace>('places').where('userId', userId);

            return places;
        } catch (error) {
            console.error('Error places getAllByUserId:', error);
            throw new Error('Database error');
        }
    };

    getById = async (userId: number, placeId: number): Promise<IPlace | undefined> => {
        try {
            const place = await db.select('*').from<IPlace>('places').where('userId', userId).andWhere('id', placeId).first();

            return place;
        } catch (error) {
            console.error('Error places getById:', error);
            throw new Error('Database error');
        }
    };

    getByUserIdAndCoordinates = async (userId: number, latitude: number, longitude: number): Promise<IPlace | undefined> => {
        try {
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

    create = async (userId: number, data: PlaceData): Promise<IPlace> => {
        try {
            const [newPlace] = await db('places')
                .insert({
                    userId: userId,
                    latitude: data.latitude,
                    longitude: data.longitude,
                })
                .returning('*');

            return newPlace;
        } catch (error) {
            console.error('Error places create:', error);
            throw new Error('Database error');
        }
    };

    update = async (userId: number, placeId: number, data: PartialPlaceData): Promise<IPlace | undefined> => {
        try {
            const [updatedPlace] = await db('places').where('userId', userId).andWhere('id', placeId).update(data).returning('*');

            return updatedPlace;
        } catch (error) {
            console.error('Error places update:', error);
            throw new Error('Database error');
        }
    };

    delete = async (userId: number, placeId: number): Promise<IPlace | undefined> => {
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
