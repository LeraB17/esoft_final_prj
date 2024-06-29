import { GetNotesArgs } from './GetNotesArgs';
import { IImageService } from './IImageService';
import { ILabelService } from './ILabelService';
import { INote, NoteData, PartialNoteData } from './INote';
import { INoteRepo } from './INoteRepo';
import { IPlaceService } from './IPlaceService';
import { IDType } from './types';

export interface INoteService {
    noteRepo: INoteRepo;
    placeService: IPlaceService;
    labelService: ILabelService;
    imageService: IImageService;
    getAll: () => Promise<INote[]>;
    getAllByUserId: (userId: IDType, args: GetNotesArgs) => Promise<INote[]>;
    getTotalCount: (userId: IDType) => Promise<number>;
    getById: (userId: IDType, noteId: IDType) => Promise<INote | undefined>;
    create: (userId: IDType, data: NoteData) => Promise<INote>;
    update: (userId: IDType, noteId: IDType, data: PartialNoteData) => Promise<INote | undefined>;
    delete: (userId: IDType, noteId: IDType) => Promise<INote | undefined>;
}
