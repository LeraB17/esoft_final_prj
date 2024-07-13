import { ILabel, LabelData, PartialLabelData } from './ILabel';
import { IDType } from '../types';
import { INoteLabel } from '../Note/INoteLabel';

export interface ILabelRepo {
    tableName: string;
    getAll: () => Promise<ILabel[]>;
    getAllForUser: (userId: IDType) => Promise<ILabel[]>;
    getByNoteId: (noteId: IDType) => Promise<ILabel[]>;
    getById: (labelId: IDType) => Promise<ILabel | undefined>;
    create: (userId: IDType, data: LabelData) => Promise<ILabel>;
    update: (userId: IDType, labelId: IDType, data: PartialLabelData) => Promise<ILabel | undefined>;
    delete: (userId: IDType, labelId: IDType) => Promise<ILabel | undefined>;
    addManyByNoteId: (noteId: IDType, labelIds: IDType[]) => Promise<INoteLabel[]>;
    deleteAllByNoteId: (noteId: IDType) => Promise<INoteLabel[]>;
}
