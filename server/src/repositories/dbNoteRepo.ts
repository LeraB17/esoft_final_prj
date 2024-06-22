import { INoteRepo } from '../interfaces/INoteRepo';
import { INote, NoteData } from '../interfaces/INote';
import db from '../db/db';
import { IDType } from '../interfaces/types';

class DbNoteRepo implements INoteRepo {
    constructor() {}

    getAll = async (): Promise<INote[]> => {
        try {
            const notes = await db.select('*').from<INote>('notes');

            return notes;
        } catch (error) {
            console.error('Error notes getAll:', error);
            throw new Error('Database error');
        }
    };

    getAllByUserId = async (userId: IDType, limit: number, offset: number): Promise<INote[]> => {
        try {
            const notes = await db
                .select(
                    'notes.*',
                    db.raw(
                        "json_build_object('id', publicity_statuses.id, 'name', publicity_statuses.\"statusName\") as publicityStatus"
                    ),
                    db.raw(
                        "json_build_object('id', places.id, 'name', places.name, 'latitude', places.latitude, 'longitude', places.longitude) as place"
                    )
                )
                .from<INote>('notes')
                .leftJoin('publicity_statuses', 'notes.publicityStatusId', 'publicity_statuses.id')
                .leftJoin('places', 'notes.placeId', 'places.id')
                .where('notes.userId', userId)
                .limit(limit)
                .offset(offset);

            const notesWithLabelsAndImages = await Promise.all(
                notes.map(async (note) => {
                    const labels = await db('labels')
                        .join('notes_labels', 'labels.id', 'notes_labels.labelId')
                        .where('notes_labels.noteId', note.id)
                        .select('labels.id', 'labels.name');

                    const images = await db('images')
                        .where('images.noteId', note.id)
                        .select('images.id', 'images.uri', 'images.createdAt');

                    return {
                        ...note,
                        labels,
                        images,
                    };
                })
            );

            return notesWithLabelsAndImages;
        } catch (error) {
            console.error('Error notes getAllByUserId:', error);
            throw new Error('Database error');
        }
    };

    getTotalCount = async (userId: IDType): Promise<number> => {
        try {
            const result = await db('notes').where('userId', userId).count('* as count');
            const totalCount = result[0].count as number;

            return totalCount;
        } catch (error) {
            console.error('Error notes getCount:', error);
            throw new Error('Database error');
        }
    };

    getAllByPlaceId = async (userId: IDType, placeId: IDType): Promise<INote[]> => {
        try {
            const notes = await db.select('*').from<INote>('notes').where('userId', userId).andWhere('placeId', placeId);

            return notes;
        } catch (error) {
            console.error('Error notes getAllByUserId:', error);
            throw new Error('Database error');
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
            throw new Error('Database error');
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
                    publicityStatusId: data.publicityStatus?.id,
                })
                .returning('*');

            return newNote;
        } catch (error) {
            console.error('Error notes create:', error);
            throw new Error('Database error');
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
