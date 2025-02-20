import { GetNotesArgs } from '../interfaces/GetNotesArgs';
import { IImageService } from '../interfaces/Image/IImageService';
import { ILabelService } from '../interfaces/Label/ILabelService';
import { INote, NoteData, PartialNoteData } from '../interfaces/Note/INote';
import { INoteRepo } from '../interfaces/Note/INoteRepo';
import { INoteService } from '../interfaces/Note/INoteService';
import { IPlace } from '../interfaces/Place/IPlace';
import { IPlaceService } from '../interfaces/Place/IPlaceService';
import { IShortcutService } from '../interfaces/Shortcut/IShortcutService';
import { IUserService } from '../interfaces/User/IUserService';
import { IDType } from '../interfaces/types';
import { deleteFromFolder, getLimitAndOffset } from '../utils/functions';

class NoteService implements INoteService {
    constructor(
        readonly noteRepo: INoteRepo,
        readonly placeService: IPlaceService,
        readonly labelService: ILabelService,
        readonly imageService: IImageService,
        readonly userService: IUserService,
        readonly shortcutService: IShortcutService
    ) {}

    getAll = async (): Promise<INote[]> => {
        return this.noteRepo.getAll();
    };

    getAllByUserId = async (userId: IDType, targetUserId: IDType, args: GetNotesArgs): Promise<INote[]> => {
        const statuses = await this.userService.getPublicityStatusesForUser(userId, targetUserId);

        const args_ = getLimitAndOffset({ ...args, statuses });

        const notes = await this.noteRepo.getAllByUserId(userId, targetUserId, args_);

        const userShortcuts = await this.shortcutService.getAllByUserId(userId, args_);

        const notesWithShortcuts = notes.map((note) => {
            const shortcut = userShortcuts.find((shr) => shr.id === note.id);
            return shortcut ? shortcut : { ...note, isShortcut: false };
        });

        return notesWithShortcuts;
    };

    getTotalCount = async (userId: IDType, targetUserId: IDType, args: GetNotesArgs): Promise<number> => {
        const statuses = await this.userService.getPublicityStatusesForUser(userId, targetUserId);

        const args_ = getLimitAndOffset({ ...args, statuses });

        const notesCount = await this.noteRepo.getTotalCount(userId, targetUserId, args_);

        return notesCount;
    };

    getById = async (userId: IDType, noteId: IDType, targetUserId?: IDType): Promise<INote | undefined> => {
        if (targetUserId) {
            const statuses = await this.userService.getPublicityStatusesForUser(userId, targetUserId);

            const note = await this.noteRepo.getById(noteId);
            if (!note) {
                return undefined;
            }
            if (!statuses.includes(note.publicityStatus.id)) {
                throw new Error('Not allow');
            }

            const shortcut = await this.shortcutService.getOne(userId, noteId);
            return { ...note, isShortcut: !!shortcut };
        } else {
            return this.noteRepo.getById(noteId);
        }
    };

    create = async (userId: IDType, data: NoteData): Promise<INote> => {
        const labels = data.labels;
        const placeData = data.place;
        const images = data.images;

        // создание / получение места
        let place: IPlace | undefined;
        place = await this.placeService.getByUserIdAndCoordinates(userId, placeData);
        if (!place) {
            place = await this.placeService.create(userId, placeData);
        } else if (place.name !== placeData.name) {
            await this.placeService.update(userId, place.id, placeData);
        }

        if (!place?.id) {
            throw new Error('Place not found or uncorrect place');
        }

        // создание заметки
        const newNote = await this.noteRepo.create(userId, place?.id, data);

        // сохранение лэйблов для заметки
        if (labels.length > 0) {
            await this.labelService.addManyByNoteId(userId, newNote.id, labels);
        }

        // сохранение изображений
        if (images.length > 0) {
            await this.imageService.createManyByNoteId(
                newNote.id,
                images.map((img) => ({ uri: img }))
            );
        }

        const result = await this.noteRepo.getById(newNote.id);

        if (!result) {
            throw new Error('Something went wrong... Note not created');
        }

        return result;
    };

    update = async (userId: IDType, noteId: IDType, data: PartialNoteData): Promise<INote | undefined> => {
        const labels = data.labels;
        const placeName = data.place?.name;
        const images = data.images;
        const oldImages = data.oldImages;

        // обновление названия места
        if (placeName) {
            const note = await this.noteRepo.getById(noteId);
            if (!note) {
                throw new Error('Note not found');
            }
            await this.placeService.update(userId, note.place.id, { name: placeName });
        }

        // обновление лэйблов для заметки
        if (labels) {
            await this.labelService.deleteAllByNoteId(noteId);
            if (labels.length > 0) {
                await this.labelService.addManyByNoteId(userId, noteId, labels);
            }
        }

        // обновление изображений
        if (oldImages && oldImages.length > 0) {
            await this.imageService.deleteNotFromList(noteId, oldImages);
        }
        if (images && images.length > 0) {
            await this.imageService.createManyByNoteId(
                noteId,
                images.map((img) => ({
                    uri: img,
                }))
            );
        }

        const { labels: lbls, images: imgs, ...updateData } = data;

        return this.noteRepo.update(userId, noteId, updateData);
    };

    delete = async (userId: IDType, noteId: IDType): Promise<INote | undefined> => {
        const images = await this.imageService.getByNoteId(noteId);
        if (images) {
            deleteFromFolder(images.map((img) => img.uri));
        }

        const deleted = await this.noteRepo.delete(userId, noteId);
        if (deleted) {
            // удалить точку на карте, если это была последняя заметка
            const placeId = (deleted as any).placeId;
            const countNotes = await this.noteRepo.getTotalCount(userId, userId, {
                placeId: placeId,
                limit: 2,
                offset: 0,
            });
            if (countNotes === 0) {
                await this.placeService.delete(userId, placeId);
            }
        }

        return this.noteRepo.delete(userId, noteId);
    };
}

export default NoteService;
