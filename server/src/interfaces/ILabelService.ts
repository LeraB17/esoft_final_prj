import { ILabel, LabelData, PartialLabelData } from './ILabel';
import { ILabelRepo } from './ILabelRepo';
import { IDType } from './types';

export interface ILabelService {
    labelRepo: ILabelRepo;
    getAll: () => Promise<ILabel[]>;
    getAllForUser: (userId: IDType) => Promise<ILabel[]>;
    getByNoteId: (noteId: IDType) => Promise<ILabel[]>;
    getById: (labelId: IDType) => Promise<ILabel | undefined>;
    create: (userId: IDType, data: LabelData) => Promise<ILabel>;
    update: (userId: IDType, labelId: IDType, data: PartialLabelData) => Promise<ILabel | undefined>;
    delete: (userId: IDType, labelId: IDType) => Promise<ILabel | undefined>;
    updateNoteLabels: (userId: IDType, noteId: IDType, labelsIds: IDType[]) => Promise<void>;
    // addByNoteId: (noteId: IDType, labelId: IDType) => Promise<INoteLabel>;
    // deleteByNoteId: (noteId: IDType, labelId: IDType) => Promise<INoteLabel>;
}
