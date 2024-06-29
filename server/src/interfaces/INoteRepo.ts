import { GetNotesArgs } from './GetNotesArgs';
import { INote, NoteData, PartialNoteData } from './INote';
import { IDType } from './types';

export interface INoteRepo {
    tableName: string;
    getAll: () => Promise<INote[]>;
    getAllByUserId: (userId: IDType, args: GetNotesArgs) => Promise<INote[]>;
    getTotalCount: (userId: IDType) => Promise<number>;
    getById: (userId: IDType, noteId: IDType) => Promise<INote | undefined>;
    create: (userId: IDType, placeId: IDType, data: NoteData) => Promise<INote>;
    update: (userId: IDType, noteId: IDType, data: PartialNoteData) => Promise<INote | undefined>;
    delete: (userId: IDType, noteId: IDType) => Promise<INote | undefined>;
}
