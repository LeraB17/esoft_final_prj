import { INote, NoteData, PartialNoteData } from './INote';

export interface INoteRepo {
    getAll: () => Promise<INote[]>;
    getAllByUserId: (userId: number) => Promise<INote[]>;
    getAllByPlaceId: (userId: number, placeId: number) => Promise<INote[]>;
    getById: (userId: number, placeId: number, noteId: number) => Promise<INote | undefined>;
    create: (userId: number, placeId: number, data: NoteData) => Promise<INote>;
    update: (userId: number, placeId: number, noteId: number, data: PartialNoteData) => Promise<INote | undefined>;
    delete: (userId: number, placeId: number, noteId: number) => Promise<INote | undefined>;
}
