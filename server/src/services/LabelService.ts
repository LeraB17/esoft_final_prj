import { ILabel, LabelData, PartialLabelData } from '../interfaces/ILabel';
import { ILabelRepo } from '../interfaces/ILabelRepo';
import { ILabelService } from '../interfaces/ILabelService';
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

    updateNoteLabels = async (userId: IDType, noteId: IDType, labelsIds: IDType[]): Promise<void> => {
        // удалить лэйблы, которые больше не актуальны (нет в списке)
        await this.labelRepo.deleteByNoteId(noteId, labelsIds);
        // получить лэйблы, которые остались у заметки
        const labels = await this.labelRepo.getByNoteId(noteId);
        // сохранить лэйблы, которых ещё не было
        labelsIds.forEach(async (item) => {
            if (!labels.find((lab) => lab.id === item)) {
                // проверить, существует ли лэйбл и доступен ли он для пользователя
                const label = await this.labelRepo.getById(item);
                if (label && (label.userId === userId || label.userId === null)) {
                    await this.labelRepo.addByNoteId(noteId, item);
                }
            }
        });
    };
}

export default LabelService;
