import { INoteRepo } from '../interfaces/Note/INoteRepo';
import { INote, NoteData, PartialNoteData } from '../interfaces/Note/INote';
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

    getAllByUserId = async (userId: IDType, targetUserId: IDType, args: GetNotesArgs): Promise<INote[]> => {
        try {
            let query = db(this.tableName)
                .select(
                    'notes.*',
                    db.raw(
                        'json_build_object(\'id\', publicity_statuses.id, \'statusName\', publicity_statuses."statusName") as "publicityStatus"'
                    ),
                    db.raw(
                        "json_build_object('id', places.id, 'name', places.name, 'latitude', places.latitude, 'longitude', places.longitude) as place"
                    ),
                    db.raw("json_build_object('id', users.id, 'nickname', users.nickname, 'avatar', users.avatar) as user")
                )
                .leftJoin('publicity_statuses', 'notes.publicityStatusId', 'publicity_statuses.id')
                .leftJoin('places', 'notes.placeId', 'places.id')
                .join('users', `${this.tableName}.userId`, 'users.id')
                .groupBy(
                    'notes.id',
                    'users.id',
                    'publicity_statuses.id',
                    'publicity_statuses.statusName',
                    'places.id',
                    'places.name',
                    'places.latitude',
                    'places.longitude'
                );

            if (userId === targetUserId) {
                query = query
                    .leftJoin('notes_shortcuts', 'notes_shortcuts.noteId', 'notes.id')
                    .where((builder) => builder.where('notes.userId', targetUserId).orWhere('notes_shortcuts.userId', userId));
            } else {
                query = query.where('notes.userId', targetUserId);
            }

            if (args.statuses) {
                query = query.whereIn('notes.publicityStatusId', args.statuses);
            }
            if (args.search) {
                query = query.andWhere((qb: any) => {
                    qb.where('notes.name', 'like', `%${args.search}%`).orWhere('notes.text', 'like', `%${args.search}%`);
                });
            }
            if (args.placeId) {
                query = query.where('notes.placeId', args.placeId);
            }
            if (args.labels && args.labels.length > 0) {
                query = query
                    .leftJoin('notes_labels', 'notes.id', 'notes_labels.noteId')
                    .whereIn('notes_labels.labelId', args.labels)
                    .havingRaw('COUNT(DISTINCT notes_labels."labelId") = ?', [args.labels.length]);
            }
            if (args.center && args.radius) {
                const [latitude, longitude] = args.center;
                console.log('filter', latitude, longitude, args.radius);
                query = query.whereRaw(
                    `ST_DWithin(
                      ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography,
                      ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography,
                      ?
                    )`,
                    [longitude, latitude, args.radius]
                );
            }
            if (args.sortDate?.column) {
                query = query.orderBy(args.sortDate?.column, args.sortDate?.order);
            }
            if (args.type) {
                query = query.where(`places.type`, args.type);
            }

            const notes = await query.limit(args.limit).offset(args.offset);

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

    getTotalCount = async (userId: IDType, targetUserId: IDType, args: GetNotesArgs): Promise<number> => {
        try {
            let query = db(this.tableName).groupBy('notes.id');

            if (userId === targetUserId) {
                query = query
                    .leftJoin('notes_shortcuts', 'notes_shortcuts.noteId', 'notes.id')
                    .where((builder) => builder.where('notes.userId', targetUserId).orWhere('notes_shortcuts.userId', userId));
            } else {
                query = query.where('notes.userId', targetUserId);
            }

            if (args.statuses) {
                query = query.whereIn('notes.publicityStatusId', args.statuses);
            }
            if (args.search) {
                query = query.andWhere((qb: any) => {
                    qb.where('notes.name', 'like', `%${args.search}%`).orWhere('notes.text', 'like', `%${args.search}%`);
                });
            }
            if (args.placeId) {
                query = query.where('notes.placeId', args.placeId);
            }
            if (args.labels && args.labels.length > 0) {
                query = query
                    .leftJoin('notes_labels', 'notes.id', 'notes_labels.noteId')
                    .whereIn('notes_labels.labelId', args.labels)
                    .havingRaw('COUNT(DISTINCT notes_labels."labelId") = ?', [args.labels.length]);
            }
            if ((args.center && args.radius) || args.type) {
                query = query.leftJoin('places', 'notes.placeId', 'places.id');
            }
            if (args.center && args.radius) {
                const [latitude, longitude] = args.center;
                query = query.whereRaw(
                    `ST_DWithin(
                      ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography,
                      ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography,
                      ?
                    )`,
                    [longitude, latitude, args.radius]
                );
            }
            if (args.type) {
                query = query.where(`places.type`, args.type);
            }

            const result = await query.count('* as count');
            const totalCount = result.length;

            return totalCount;
        } catch (error) {
            console.error(`Error ${this.tableName} getTotalCount:`, error);
            throw new Error('Database error');
        }
    };

    getById = async (noteId: IDType): Promise<INote | undefined> => {
        try {
            const note = await db
                .select(
                    'notes.*',
                    db.raw(
                        'json_build_object(\'id\', publicity_statuses.id, \'statusName\', publicity_statuses."statusName") as "publicityStatus"'
                    ),
                    db.raw(
                        "json_build_object('id', places.id, 'name', places.name, 'latitude', places.latitude, 'longitude', places.longitude) as place"
                    )
                )
                .from<INote>(this.tableName)
                .leftJoin('publicity_statuses', 'notes.publicityStatusId', 'publicity_statuses.id')
                .leftJoin('places', 'notes.placeId', 'places.id')
                .where('notes.id', noteId)
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
