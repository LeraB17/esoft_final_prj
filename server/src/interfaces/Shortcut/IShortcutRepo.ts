import { GetNotesArgs } from '../GetNotesArgs';
import { INote } from '../Note/INote';
import { IDType } from '../types';
import { IShortcut } from './IShortcut';

export interface IShortcutRepo {
    tableName: string;
    getAllByUserId: (userId: IDType, args: GetNotesArgs) => Promise<INote[]>;
    getTotalCount: (userId: IDType, args: GetNotesArgs) => Promise<number>;
    getOne: (userId: IDType, noteId: IDType) => Promise<IShortcut | undefined>;
    create: (userId: IDType, noteId: IDType) => Promise<IShortcut>;
    delete: (userId: IDType, noteId: IDType) => Promise<IShortcut | undefined>;
}
