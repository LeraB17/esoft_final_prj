import { INoteRepo } from '../interfaces/INoteRepo';
import { INote, NoteData } from '../interfaces/INote';
import db from '../db/db';
import { IDType } from '../interfaces/types';
import { ILabel } from '../interfaces/ILabel';
import { INoteLabel } from '../interfaces/INoteLabel';

class DbNoteRepo implements INoteRepo {
    constructor() {}

    getAll = async (): Promise<INote[]> => {
        try {
            const notes = await db.select('*').from<INote>('notes');

            return notes;
        } catch (error) {
            console.error('Error notes getAll:', error);
            throw error;
        }
    };

    getAllByUserId = async (userId: IDType): Promise<INote[]> => {
        try {
            const notes = await db.select('*').from<INote>('notes').where('userId', userId);

            return notes;
        } catch (error) {
            console.error('Error notes getAllByUserId:', error);
            throw error;
        }
    };

    getAllByPlaceId = async (userId: IDType, placeId: IDType): Promise<INote[]> => {
        try {
            const notes = await db.select('*').from<INote>('notes').where('userId', userId).andWhere('placeId', placeId);

            return notes;
        } catch (error) {
            console.error('Error notes getAllByUserId:', error);
            throw error;
        }
    };

    getById = async (userId: IDType, placeId: IDType, noteId: IDType): Promise<INote | undefined> => {
        try {
            const note = await db
                .select('*')
                .from<INote>('notes')
                .where('userId', userId)
                .andWhere('placeId', placeId)
                .andWhere('id', noteId)
                .first();

            return note;
        } catch (error) {
            console.error('Error notes getById:', error);
            throw error;
        }
    };

    create = async (userId: IDType, placeId: IDType, data: NoteData): Promise<INote> => {
        try {
            const [newNote] = await db('notes')
                .insert({
                    name: data.name,
                    text: data.text,
                    userId: userId,
                    placeId: placeId,
                    publicityStatusId: data.publicityStatusId,
                })
                .returning('*');

            return newNote;
        } catch (error) {
            console.error('Error notes create:', error);
            throw error;
        }
    };

    update = async (userId: IDType, placeId: IDType, noteId: IDType, data: Partial<NoteData>): Promise<INote | undefined> => {
        try {
            const [updatedNote] = await db('notes')
                .where('userId', userId)
                .andWhere('placeId', placeId)
                .andWhere('id', noteId)
                .update(data)
                .returning('*');

            return updatedNote;
        } catch (error) {
            console.error('Error notes update:', error);
            throw new Error('Database error');
        }
    };

    delete = async (userId: IDType, placeId: IDType, noteId: IDType): Promise<INote | undefined> => {
        try {
            const [deletedNote] = await db('notes')
                .where('userId', userId)
                .andWhere('placeId', placeId)
                .andWhere('id', noteId)
                .delete()
                .returning('*');

            return deletedNote;
        } catch (error) {
            console.error('Error notes delete:', error);
            throw new Error('Database error');
        }
    };
}

export default DbNoteRepo;
