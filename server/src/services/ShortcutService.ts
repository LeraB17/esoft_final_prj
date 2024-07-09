import { GetNotesArgs } from '../interfaces/GetNotesArgs';
import { INote } from '../interfaces/Note/INote';
import { INoteService } from '../interfaces/Note/INoteService';
import { IShortcut } from '../interfaces/Shortcut/IShortcut';
import { IShortcutRepo } from '../interfaces/Shortcut/IShortcutRepo';
import { IShortcutService } from '../interfaces/Shortcut/IShortcutService';
import { IUserService } from '../interfaces/User/IUserService';
import { IDType } from '../interfaces/types';

class ShortcutService implements IShortcutService {
    constructor(readonly shortcutRepo: IShortcutRepo, readonly userService: IUserService) {}
    public noteService?: INoteService;

    setNoteService(noteService: INoteService) {
        this.noteService = noteService;
    }

    getOne = async (userId: IDType, noteId: IDType): Promise<IShortcut | undefined> => {
        return this.shortcutRepo.getOne(userId, noteId);
    };

    getAllByUserId = async (userId: IDType, args: GetNotesArgs): Promise<INote[]> => {
        const shortcuts = await this.shortcutRepo.getAllByUserId(userId, args);

        if (this.noteService) {
            const shortcutsWithEmpty = await Promise.all(
                shortcuts.map(async (shortcut) => {
                    const note = await this.noteService?.getById(userId, shortcut.id);
                    if (!note) {
                        throw new Error('Note not found');
                    }

                    const resShortcut = { ...shortcut, isShortcut: true };

                    const statuses = await this.userService.getPublicityStatusesForUser(userId, note.userId);

                    if (statuses.includes(note.publicityStatus.id)) {
                        return resShortcut;
                    } else {
                        return { ...resShortcut, name: 'DELETED', text: 'DELETED', labels: [], images: [] };
                    }
                })
            );
            return shortcutsWithEmpty;
        }

        throw new Error('Server error');
    };

    getTotalCount = async (userId: number, args: GetNotesArgs): Promise<number> => {
        return this.shortcutRepo.getTotalCount(userId, args);
    };

    create = async (userId: IDType, noteId: IDType): Promise<IShortcut> => {
        if (this.noteService) {
            const note = await this.noteService.getById(userId, noteId);
            if (!note) {
                throw new Error('Note not found');
            }

            const authorId = note.userId;
            const statuses = await this.userService.getPublicityStatusesForUser(userId, authorId);

            if (!statuses.includes(note.publicityStatus.id)) {
                throw new Error('Not allow');
            }
            return this.shortcutRepo.create(userId, noteId);
        }

        throw new Error('Server error');
    };

    delete = async (userId: IDType, noteId: IDType): Promise<IShortcut | undefined> => {
        return this.shortcutRepo.delete(userId, noteId);
    };
}

export default ShortcutService;
