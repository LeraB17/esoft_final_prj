import { GetNotesArgs } from '../GetNotesArgs';
import { INote, NoteData, PartialNoteData } from './INote';
import { INoteRepo } from './INoteRepo';
import { IDType } from '../types';
import { ILabelService } from '../Label/ILabelService';
import { IImageService } from '../Image/IImageService';
import { IPlaceService } from '../Place/IPlaceService';
import { IUserService } from '../User/IUserService';
import { IShortcutService } from '../Shortcut/IShortcutService';

export interface INoteService {
    noteRepo: INoteRepo;
    placeService: IPlaceService;
    labelService: ILabelService;
    imageService: IImageService;
    userService: IUserService;
    shortcutService: IShortcutService;
    getAll: () => Promise<INote[]>;
    getAllByUserId: (userId: IDType, targetUserId: IDType, args: GetNotesArgs) => Promise<INote[]>;
    getTotalCount: (userId: IDType, targetUserId: IDType, args: GetNotesArgs) => Promise<number>;
    getById: (userId: IDType, targetUserId: IDType, noteId: IDType) => Promise<INote | undefined>;
    create: (userId: IDType, data: NoteData) => Promise<INote>;
    update: (userId: IDType, noteId: IDType, data: PartialNoteData) => Promise<INote | undefined>;
    delete: (userId: IDType, noteId: IDType) => Promise<INote | undefined>;
}
