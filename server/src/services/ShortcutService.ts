import { GetNotesArgs } from '../interfaces/GetNotesArgs';
import { INote } from '../interfaces/Note/INote';
import { IShortcut } from '../interfaces/Shortcut/IShortcut';
import { IShortcutRepo } from '../interfaces/Shortcut/IShortcutRepo';
import { IShortcutService } from '../interfaces/Shortcut/IShortcutService';
import { IDType } from '../interfaces/types';

class ShortcutService implements IShortcutService {
    constructor(readonly shortcutRepo: IShortcutRepo) {}

    getOne = async (userId: IDType, noteId: IDType): Promise<IShortcut | undefined> => {
        return this.shortcutRepo.getOne(userId, noteId);
    };

    getAllByUserId = async (userId: IDType, args: GetNotesArgs): Promise<INote[]> => {
        const shortcuts = await this.shortcutRepo.getAllByUserId(userId, args);
        return shortcuts;
    };

    getTotalCount = async (userId: number, args: GetNotesArgs): Promise<number> => {
        return this.shortcutRepo.getTotalCount(userId, args);
    };

    create = async (userId: IDType, noteId: IDType): Promise<IShortcut> => {
        return this.shortcutRepo.create(userId, noteId);
    };

    delete = async (userId: IDType, noteId: IDType): Promise<IShortcut | undefined> => {
        return this.shortcutRepo.delete(userId, noteId);
    };
}

export default ShortcutService;
