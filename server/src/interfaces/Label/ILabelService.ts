import { ILabel, LabelData, PartialLabelData } from './ILabel';
import { ILabelRepo } from './ILabelRepo';
import { IDType } from '../types';
import { INoteLabel } from '../Note/INoteLabel';

export interface ILabelService {
    labelRepo: ILabelRepo;
    getAll: () => Promise<ILabel[]>;
    getAllForUser: (userId: IDType) => Promise<ILabel[]>;
    getByNoteId: (noteId: IDType) => Promise<ILabel[]>;
    getById: (labelId: IDType) => Promise<ILabel | undefined>;
    create: (userId: IDType, data: LabelData) => Promise<ILabel>;
    update: (userId: IDType, labelId: IDType, data: PartialLabelData) => Promise<ILabel | undefined>;
    delete: (userId: IDType, labelId: IDType) => Promise<ILabel | undefined>;
    addManyByNoteId: (userId: IDType, noteId: IDType, labelIds: IDType[]) => Promise<INoteLabel[]>;
    deleteAllByNoteId: (noteId: IDType) => Promise<INoteLabel[] | undefined>;
}
