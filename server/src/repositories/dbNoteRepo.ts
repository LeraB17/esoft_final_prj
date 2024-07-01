import { INoteRepo } from '../interfaces/INoteRepo';
import { INote, NoteData, PartialNoteData } from '../interfaces/INote';
import db from '../db/db';
import { IDType } from '../interfaces/types';
import { GetNotesArgs } from '../interfaces/GetNotesArgs';

class DbNoteRepo implements INoteRepo {
    constructor(readonly tableName = 'notes') {}

    getAll = async (): Promise<INote[]> => {
        try {
            const notes = await db.select('*').from<INote>(this.tableName);

            return notes;
        } catch (error) {
            console.error(`Error ${this.tableName} getAll:`, error);
            throw new Error('Database error');
        }
    };

    // TODO добавить ограничение по статусам публичности
    getAllByUserId = async (userId: IDType, args: GetNotesArgs): Promise<INote[]> => {
        try {
            let query = db(this.tableName)
                .select(
                    'notes.*',
                    db.raw(
                        "json_build_object('id', publicity_statuses.id, 'name', publicity_statuses.\"statusName\") as publicityStatus"
                    ),
                    db.raw(
                        "json_build_object('id', places.id, 'name', places.name, 'latitude', places.latitude, 'longitude', places.longitude) as place"
                    )
                )
                .leftJoin('publicity_statuses', 'notes.publicityStatusId', 'publicity_statuses.id')
                .leftJoin('places', 'notes.placeId', 'places.id')
                .groupBy(
                    'notes.id',
                    'publicity_statuses.id',
                    'publicity_statuses.statusName',
                    'places.id',
                    'places.name',
                    'places.latitude',
                    'places.longitude'
                )
                .where('notes.userId', userId);

            if (args.search) {
                query = (query as any).andWhere((qb: any) => {
                    qb.where('notes.name', 'like', `%${args.search}%`).orWhere('notes.text', 'like', `%${args.search}%`);
                });
            }
            if (args.placeId) {
                query = (query as any).where('notes.placeId', args.placeId);
            }
            if (args.labels && args.labels.length > 0) {
                query = (query as any)
                    .leftJoin('notes_labels', 'notes.id', 'notes_labels.noteId')
                    .whereIn('notes_labels.labelId', args.labels)
                    .havingRaw('COUNT(DISTINCT notes_labels."labelId") = ?', [args.labels.length]);
            }
            if (args.radius) {
                // TODO добавить логику с фильтрацией
            }

            const notes = await (query as any)
                .orderBy(args.sortDate?.column, args.sortDate?.order)
                .limit(args.limit)
                .offset(args.offset);

            const notesWithLabelsAndImages = await Promise.all(
                notes.map(async (note: any) => {
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
            console.error(`Error ${this.tableName} getAllByUserId:`, error);
            throw new Error('Database error');
        }
    };

    getTotalCount = async (userId: IDType, args: GetNotesArgs): Promise<number> => {
        try {
            let query = db(this.tableName).where('notes.userId', userId).groupBy('notes.id');

            if (args.search) {
                query = (query as any)
                    .where('notes.name', 'like', `%${args.search}%`)
                    .orWhere('notes.text', 'like', `%${args.search}%`);
            }
            if (args.placeId) {
                query = (query as any).where('notes.placeId', args.placeId);
            }
            if (args.labels && args.labels.length > 0) {
                console.log('args.labels', args.labels);
                query = (query as any)
                    .leftJoin('notes_labels', 'notes.id', 'notes_labels.noteId')
                    .whereIn('notes_labels.labelId', args.labels)
                    .havingRaw('COUNT(DISTINCT notes_labels."labelId") = ?', [args.labels.length]);
            }
            if (args.radius) {
                // TODO добавить логику с фильтрацией
            }

            const result = await query.count('* as count');
            const totalCount = result.length;

            return totalCount;
        } catch (error) {
            console.error(`Error ${this.tableName} getCount:`, error);
            throw new Error('Database error');
        }
    };

    getById = async (userId: IDType, noteId: IDType): Promise<INote | undefined> => {
        try {
            const note = await db
                .select(
                    'notes.*',
                    db.raw(
                        'json_build_object(\'id\', publicity_statuses.id, \'name\', publicity_statuses."statusName") as "publicityStatus"'
                    ),
                    db.raw(
                        "json_build_object('id', places.id, 'name', places.name, 'latitude', places.latitude, 'longitude', places.longitude) as place"
                    )
                )
                .from<INote>(this.tableName)
                .leftJoin('publicity_statuses', 'notes.publicityStatusId', 'publicity_statuses.id')
                .leftJoin('places', 'notes.placeId', 'places.id')
                .where('notes.userId', userId)
                .andWhere('notes.id', noteId)
                .first();

            if (!note) {
                return undefined;
            }

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
        } catch (error) {
            console.error(`Error ${this.tableName} getById:`, error);
            throw new Error('Database error');
        }
    };

    create = async (userId: IDType, placeId: IDType, data: NoteData): Promise<INote> => {
        try {
            const [newNote] = await db(this.tableName)
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
            console.error(`Error ${this.tableName} create:`, error);
            throw new Error('Database error');
        }
    };

    update = async (userId: IDType, noteId: IDType, data: PartialNoteData): Promise<INote | undefined> => {
        try {
            const [updatedNote] = await db(this.tableName)
                .where('userId', userId)
                .andWhere('id', noteId)
                .update({
                    name: data.name,
                    text: data.text,
                    publicityStatusId: data.publicityStatusId,
                    updatedAt: data.updatedAt,
                })
                .returning('*');

            return updatedNote;
        } catch (error) {
            console.error(`Error ${this.tableName} update:`, error);
            throw new Error('Database error');
        }
    };

    delete = async (userId: IDType, noteId: IDType): Promise<INote | undefined> => {
        try {
            const [deletedNote] = await db(this.tableName).where('userId', userId).andWhere('id', noteId).delete().returning('*');

            return deletedNote;
        } catch (error) {
            console.error(`Error ${this.tableName} delete:`, error);
            throw new Error('Database error');
        }
    };
}

export default DbNoteRepo;
