import { GetNotesArgs } from '../GetNotesArgs';
import { INote } from '../Note/INote';
import { INoteService } from '../Note/INoteService';
import { IUserService } from '../User/IUserService';
import { IDType } from '../types';
import { IShortcut } from './IShortcut';
import { IShortcutRepo } from './IShortcutRepo';

export interface IShortcutService {
    shortcutRepo: IShortcutRepo;
    userService: IUserService;
    noteService?: INoteService;
    setNoteService: (noteService: INoteService) => void;
    getAllByUserId: (userId: IDType, args: GetNotesArgs) => Promise<INote[]>;
    getTotalCount: (userId: IDType, args: GetNotesArgs) => Promise<number>;
    getOne: (userId: IDType, noteId: IDType) => Promise<IShortcut | undefined>;
    create: (userId: IDType, noteId: IDType) => Promise<IShortcut>;
    delete: (userId: IDType, noteId: IDType) => Promise<IShortcut | undefined>;
}
