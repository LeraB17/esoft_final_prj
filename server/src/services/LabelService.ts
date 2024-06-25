import { ILabel, LabelData, PartialLabelData } from '../interfaces/ILabel';
import { ILabelRepo } from '../interfaces/ILabelRepo';
import { ILabelService } from '../interfaces/ILabelService';
import { INoteLabel } from '../interfaces/INoteLabel';
import { IDType } from '../interfaces/types';

class LabelService implements ILabelService {
    constructor(readonly labelRepo: ILabelRepo) {}

    getAll = async (): Promise<ILabel[]> => {
        return this.labelRepo.getAll();
    };

    getAllForUser = async (userId: IDType): Promise<ILabel[]> => {
        return this.labelRepo.getAllForUser(userId);
    };

    getByNoteId = async (noteId: IDType): Promise<ILabel[]> => {
        return this.labelRepo.getByNoteId(noteId);
    };

    getById = async (labelId: IDType): Promise<ILabel | undefined> => {
        return this.labelRepo.getById(labelId);
    };

    create = async (userId: IDType, data: LabelData): Promise<ILabel> => {
        return this.labelRepo.create(userId, data);
    };

    update = async (userId: IDType, labelId: IDType, data: PartialLabelData): Promise<ILabel | undefined> => {
        return this.labelRepo.update(userId, labelId, data);
    };

    delete = async (userId: IDType, labelId: IDType): Promise<ILabel | undefined> => {
        return this.labelRepo.delete(userId, labelId);
    };

    addManyByNoteId = async (userId: IDType, noteId: IDType, labelIds: IDType[]): Promise<INoteLabel[]> => {
        const labelsForUser = await this.labelRepo.getAllForUser(userId);
        const labels = labelsForUser.filter((label) => labelIds.includes(label.id));

        return await this.labelRepo.addManyByNoteId(
            noteId,
            labels.map((label) => label.id)
        );
    };

    deleteAllByNoteId = async (noteId: IDType): Promise<INoteLabel[] | undefined> => {
        return this.labelRepo.deleteAllByNoteId(noteId);
    };
}

export default LabelService;
