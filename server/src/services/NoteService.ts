import { ILabelService } from '../interfaces/ILabelService';
import { INote, NoteData, PartialNoteData } from '../interfaces/INote';
import { INoteRepo } from '../interfaces/INoteRepo';
import { INoteService } from '../interfaces/INoteService';
import { IPlace } from '../interfaces/IPlace';
import { IPlaceService } from '../interfaces/IPlaceService';
import { IDType } from '../interfaces/types';

class NoteService implements INoteService {
    constructor(readonly noteRepo: INoteRepo, readonly placeService: IPlaceService, readonly labelService: ILabelService) {}

    getAll = async (): Promise<INote[]> => {
        return this.noteRepo.getAll();
    };

    getAllByUserId = async (userId: IDType): Promise<INote[]> => {
        return this.noteRepo.getAllByUserId(userId);
    };

    getAllByPlaceId = async (userId: IDType, placeId: IDType): Promise<INote[]> => {
        return this.noteRepo.getAllByPlaceId(userId, placeId);
    };

    getById = async (userId: IDType, placeId: IDType, noteId: IDType): Promise<INote | undefined> => {
        return this.noteRepo.getById(userId, placeId, noteId);
    };

    create = async (userId: IDType, data: NoteData): Promise<INote> => {
        let place: IPlace | undefined;
        const labels = data.labels;
        const placeData = data.place;

        // создание / получение места
        place = await this.placeService.getByUserIdAndCoordinates(userId, placeData);
        if (!place) {
            place = await this.placeService.create(userId, placeData);
        }

        if (!Number(place?.id)) {
            throw new Error('Place not found or uncorrect place');
        }

        // создание заметки
        const newNote = await this.noteRepo.create(userId, place?.id, data);

        // сохранение лэйблов для заметки
        if (labels.length > 0) {
            await this.labelService.updateNoteLabels(userId, newNote.id, labels);
        }

        // получение лэйблов и добавление к результату
        const noteLabels = await this.labelService.getByNoteId(newNote.id);
        const result = { ...newNote, labels: noteLabels };

        return result;
    };

    update = async (userId: IDType, placeId: IDType, noteId: IDType, data: PartialNoteData): Promise<INote | undefined> => {
        const labels = data.labels;
        // обновление лэйблов для заметки
        if (labels && labels.length > 0) {
            await this.labelService.updateNoteLabels(userId, noteId, labels);
        }

        return this.noteRepo.update(userId, placeId, noteId, data);
    };

    delete = async (userId: IDType, placeId: IDType, noteId: IDType): Promise<INote | undefined> => {
        return this.noteRepo.delete(userId, placeId, noteId);
    };
}

export default NoteService;
