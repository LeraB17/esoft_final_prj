import db from '../db/db';
import { IDType } from '../interfaces/types';
import { IImageRepo } from '../interfaces/IImageRepo';
import { IImage, ImageData } from '../interfaces/IImage';

class DbImageRepo implements IImageRepo {
    constructor(readonly tableName = 'images') {}

    getByNoteId = async (noteId: IDType): Promise<IImage[]> => {
        try {
            const images = await db(this.tableName).select('*').where('noteId', noteId);

            return images;
        } catch (error) {
            console.error(`Error ${this.tableName} getByNoteId:`, error);
            throw new Error('Database error');
        }
    };

    getById = async (imageId: IDType): Promise<IImage | undefined> => {
        try {
            const image = await db(this.tableName).select('*').where('id', imageId).first();

            return image;
        } catch (error) {
            console.error(`Error ${this.tableName} getById:`, error);
            throw new Error('Database error');
        }
    };

    create = async (noteId: IDType, data: ImageData): Promise<IImage> => {
        try {
            const [newImage] = await db(this.tableName)
                .insert({
                    uri: data.uri,
                    noteId,
                })
                .returning('*');

            return newImage;
        } catch (error) {
            console.error(`Error ${this.tableName} create:`, error);
            throw new Error('Database error');
        }
    };

    update = async (imageId: IDType, data: ImageData): Promise<IImage | undefined> => {
        try {
            const [updatedImage] = await db(this.tableName).where('id', imageId).update(data).returning('*');

            return updatedImage;
        } catch (error) {
            console.error(`Error ${this.tableName} update:`, error);
            throw new Error('Database error');
        }
    };

    delete = async (imageId: IDType): Promise<IImage | undefined> => {
        try {
            const [deletedImage] = await db(this.tableName).where('id', imageId).delete().returning('*');

            return deletedImage;
        } catch (error) {
            console.error(`Error ${this.tableName} delete:`, error);
            throw new Error('Database error');
        }
    };

    createManyByNoteId = async (noteId: IDType, imagesData: ImageData[]): Promise<IImage[]> => {
        try {
            const images = imagesData.map((img) => ({ ...img, noteId: noteId }));
            const [newImages] = await db(this.tableName).insert(images).returning('*');

            return newImages;
        } catch (error) {
            console.error(`Error ${this.tableName} createManyByNoteId:`, error);
            throw new Error('Database error');
        }
    };

    deleteAllByNoteId = async (noteId: IDType): Promise<IImage[] | undefined> => {
        try {
            const deletedImages = await db(this.tableName).where({ noteId: noteId }).delete().returning('*');

            return deletedImages;
        } catch (error) {
            console.error(`Error ${this.tableName} deleteAllByNoteId:`, error);
            throw new Error('Database error');
        }
    };

    deleteNotFromList = async (noteId: number, imageIds: IDType[]): Promise<IImage[] | undefined> => {
        try {
            console.log('ids', imageIds);
            const deletedImages = await db(this.tableName)
                .whereNotIn('id', imageIds)
                .andWhere({ noteId: noteId })
                .delete()
                .returning('*');

            return deletedImages;
        } catch (error) {
            console.error(`Error ${this.tableName} deleteNotFromList:`, error);
            throw new Error('Database error');
        }
    };
}

export default DbImageRepo;
