import { INote, NoteData, PartialNoteData } from './INote';
import { IDType } from '../types';
import { GetNotesArgs } from '../GetNotesArgs';

export interface INoteRepo {
    tableName: string;
    getAll: () => Promise<INote[]>;
    getAllByUserId: (userId: IDType, targetUserId: IDType, args: GetNotesArgs) => Promise<INote[]>;
    getTotalCount: (userId: IDType, targetUserId: IDType, args: GetNotesArgs) => Promise<number>;
    getById: (userId: IDType, targetUserId: IDType, noteId: IDType) => Promise<INote | undefined>;
    create: (userId: IDType, placeId: IDType, data: NoteData) => Promise<INote>;
    update: (userId: IDType, noteId: IDType, data: PartialNoteData) => Promise<INote | undefined>;
    delete: (userId: IDType, noteId: IDType) => Promise<INote | undefined>;
}
