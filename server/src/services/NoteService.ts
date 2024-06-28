import { IImageService } from '../interfaces/IImageService';
import { ILabelService } from '../interfaces/ILabelService';
import { INote, NoteData, PartialNoteData } from '../interfaces/INote';
import { INoteRepo } from '../interfaces/INoteRepo';
import { INoteService } from '../interfaces/INoteService';
import { IPlace } from '../interfaces/IPlace';
import { IPlaceService } from '../interfaces/IPlaceService';
import { IDType } from '../interfaces/types';

class NoteService implements INoteService {
    constructor(
        readonly noteRepo: INoteRepo,
        readonly placeService: IPlaceService,
        readonly labelService: ILabelService,
        readonly imageService: IImageService
    ) {}

    getAll = async (): Promise<INote[]> => {
        return this.noteRepo.getAll();
    };

    getAllByUserId = async (userId: IDType, limit: number, offset: number): Promise<INote[]> => {
        const limitedLimit = Math.min(50, limit);
        return this.noteRepo.getAllByUserId(userId, limitedLimit, offset);
    };

    getTotalCount = async (userId: IDType): Promise<number> => {
        return this.noteRepo.getTotalCount(userId);
    };

    getAllByPlaceId = async (userId: IDType, placeId: IDType): Promise<INote[]> => {
        return this.noteRepo.getAllByPlaceId(userId, placeId);
    };

    getById = async (userId: IDType, noteId: IDType): Promise<INote | undefined> => {
        return this.noteRepo.getById(userId, noteId);
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

        const result = await this.noteRepo.getById(userId, newNote.id);

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
            const note = await this.noteRepo.getById(userId, noteId);
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
        if (images) {
            // await this.imageService.deleteAllByNoteId(noteId);
            if (images.length > 0) {
                await this.imageService.createManyByNoteId(
                    noteId,
                    images.map((img) => ({
                        uri: img,
                    }))
                );
            }
        }

        const { labels: lbls, images: imgs, ...updateData } = data;

        return this.noteRepo.update(userId, noteId, updateData);
    };

    delete = async (userId: IDType, noteId: IDType): Promise<INote | undefined> => {
        const images = await this.imageService.getByNoteId(noteId);
        if (images) {
            await this.imageService.deleteFromFolder(images);
        }

        return this.noteRepo.delete(userId, noteId);
    };
}

export default NoteService;
