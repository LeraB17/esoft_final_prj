import { INote, NoteData } from './INote';
import { INoteRepo } from './INoteRepo';

export interface INoteService {
    noteRepo: INoteRepo;
    getAll: () => Promise<INote[]>;
    getAllByUserId: (userId: number) => Promise<INote[]>;
    getAllByPlaceId: (userId: number, placeId: number) => Promise<INote[]>;
    getById: (userId: number, placeId: number, noteId: number) => Promise<INote | undefined>;
    create: (userId: number, data: NoteData) => Promise<INote>;
    update: (userId: number, placeId: number, noteId: number, data: NoteData) => Promise<INote | undefined>;
    delete: (userId: number, placeId: number, noteId: number) => Promise<INote | undefined>;
}
