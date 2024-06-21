import { INote, NoteData, PartialNoteData } from './INote';
import { IDType } from './types';

export interface INoteRepo {
    getAll: () => Promise<INote[]>;
    getAllByUserId: (userId: IDType) => Promise<INote[]>;
    getAllByPlaceId: (userId: IDType, placeId: IDType) => Promise<INote[]>;
    getById: (userId: IDType, placeId: IDType, noteId: IDType) => Promise<INote | undefined>;
    create: (userId: IDType, placeId: IDType, data: NoteData) => Promise<INote>;
    update: (userId: IDType, placeId: IDType, noteId: IDType, data: PartialNoteData) => Promise<INote | undefined>;
    delete: (userId: IDType, placeId: IDType, noteId: IDType) => Promise<INote | undefined>;
}
