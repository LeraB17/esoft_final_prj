import { GetNotesArgs } from './GetNotesArgs';
import { IImageService } from './IImageService';
import { ILabelService } from './ILabelService';
import { INote, NoteData, PartialNoteData } from './INote';
import { INoteRepo } from './INoteRepo';
import { IPlaceService } from './IPlaceService';
import { IUserService } from './IUserService';
import { IDType } from './types';

export interface INoteService {
    noteRepo: INoteRepo;
    placeService: IPlaceService;
    labelService: ILabelService;
    imageService: IImageService;
    userService: IUserService;
    getAll: () => Promise<INote[]>;
    getAllByUserId: (userId: IDType, targetUserName: string, args: GetNotesArgs) => Promise<INote[]>;
    getTotalCount: (userId: IDType, targetUserName: string, args: GetNotesArgs) => Promise<number>;
    getById: (userId: IDType, targetUserName: string, noteId: IDType) => Promise<INote | undefined>;
    create: (userId: IDType, data: NoteData) => Promise<INote>;
    update: (userId: IDType, noteId: IDType, data: PartialNoteData) => Promise<INote | undefined>;
    delete: (userId: IDType, noteId: IDType) => Promise<INote | undefined>;
}
