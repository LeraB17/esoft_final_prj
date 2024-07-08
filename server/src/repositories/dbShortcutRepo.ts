import db from '../db/db';
import { IDType } from '../interfaces/types';
import { IShortcutRepo } from '../interfaces/Shortcut/IShortcutRepo';
import { IShortcut } from '../interfaces/Shortcut/IShortcut';
import { GetNotesArgs } from '../interfaces/GetNotesArgs';
import { INote } from '../interfaces/Note/INote';

class dbShortcutRepo implements IShortcutRepo {
    constructor(readonly tableName = 'notes_shortcuts') {}

    getOne = async (userId: IDType, noteId: IDType): Promise<IShortcut | undefined> => {
        try {
            const shortcut = await db.select('*').from<IShortcut>(this.tableName).where({ userId, noteId }).first();

            return shortcut;
        } catch (error) {
            console.error(`Error ${this.tableName} getOne:`, error);
            throw new Error('Database error');
        }
    };

    getAllByUserId = async (userId: IDType, args: GetNotesArgs): Promise<INote[]> => {
        try {
            let query = db('notes')
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
                .leftJoin(this.tableName, `${this.tableName}.noteId`, 'notes.id')
                .leftJoin('users', `notes.userId`, 'users.id')
                .groupBy(
                    'notes.id',
                    'users.id',
                    'publicity_statuses.id',
                    'publicity_statuses.statusName',
                    'places.id',
                    'places.name',
                    'places.latitude',
                    'places.longitude'
                )
                .where(`${this.tableName}.userId`, userId);

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
            if (args.radius) {
                // TODO добавить логику с фильтрацией
            }
            if (args.sortDate?.column) {
                query = query.orderBy(args.sortDate?.column, args.sortDate?.order);
            }

            const notes_shortcuts = await query.limit(args.limit).offset(args.offset);

            const notesWithLabelsAndImages = await Promise.all(
                notes_shortcuts.map(async (note: any) => {
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
            let query = db(this.tableName)
                .leftJoin('notes', `${this.tableName}.noteId`, 'notes.id')
                .where(`${this.tableName}.userId`, userId);

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
            if (args.radius) {
                // TODO добавить логику с фильтрацией
            }

            const result = await query.count('* as count');
            const totalCount = result.length;

            return totalCount;
        } catch (error) {
            console.error(`Error ${this.tableName} getTotalCount:`, error);
            throw new Error('Database error');
        }
    };

    create = async (userId: IDType, noteId: IDType): Promise<IShortcut> => {
        try {
            const [newShortcut] = await db(this.tableName)
                .insert({
                    userId,
                    noteId,
                })
                .returning('*');

            return newShortcut;
        } catch (error) {
            console.error(`Error ${this.tableName} create:`, error);
            throw new Error('Database error');
        }
    };

    delete = async (userId: IDType, noteId: IDType): Promise<IShortcut | undefined> => {
        try {
            const [deletedShortcut] = await db(this.tableName).where({ userId, noteId }).delete().returning('*');

            return deletedShortcut;
        } catch (error) {
            console.error(`Error ${this.tableName} delete:`, error);
            throw new Error('Database error');
        }
    };
}

export default dbShortcutRepo;
