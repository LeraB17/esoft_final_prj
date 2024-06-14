import { INote, NoteData, PartialNoteData } from '../interfaces/INote';
import { INoteRepo } from '../interfaces/INoteRepo';
import { INoteService } from '../interfaces/INoteService';
import { IPlace } from '../interfaces/IPlace';
import { IPlaceRepo } from '../interfaces/IPlaceRepo';

class NoteService implements INoteService {
    constructor(readonly noteRepo: INoteRepo, readonly placeRepo: IPlaceRepo) {}

    getAll = async (): Promise<INote[]> => {
        return this.noteRepo.getAll();
    };

    getAllByUserId = async (userId: number): Promise<INote[]> => {
        return this.noteRepo.getAllByUserId(userId);
    };

    getAllByPlaceId = async (userId: number, placeId: number): Promise<INote[]> => {
        return this.noteRepo.getAllByPlaceId(userId, placeId);
    };

    getById = async (userId: number, placeId: number, noteId: number): Promise<INote | undefined> => {
        return this.noteRepo.getById(userId, placeId, noteId);
    };

    create = async (userId: number, data: NoteData): Promise<INote> => {
        let place: IPlace | undefined;
        place = await this.placeRepo.getByUserIdAndCoordinates(userId, data?.place?.latitude, data?.place?.longitude);
        if (!place) {
            place = await this.placeRepo.create(userId, { latitude: data?.place?.latitude, longitude: data?.place?.longitude });
        }

        if (!Number(place?.id)) {
            throw new Error('Place not found or uncorrect place');
        }

        // проверка типа данных ???
        return this.noteRepo.create(userId, place?.id, data);
    };

    update = async (userId: number, placeId: number, noteId: number, data: PartialNoteData): Promise<INote | undefined> => {
        return this.noteRepo.update(userId, placeId, noteId, data);
    };

    delete = async (userId: number, placeId: number, noteId: number): Promise<INote | undefined> => {
        return this.noteRepo.delete(userId, placeId, noteId);
    };
}

export default NoteService;
