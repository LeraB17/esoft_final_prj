import { ILabel, LabelData, PartialLabelData } from './ILabel';
import { INoteLabel } from './INoteLabel';
import { IDType } from './types';

export interface ILabelRepo {
    tableName: string;
    getAll: () => Promise<ILabel[]>;
    getAllForUser: (userId: IDType) => Promise<ILabel[]>;
    getByNoteId: (noteId: IDType) => Promise<ILabel[]>;
    getById: (labelId: IDType) => Promise<ILabel | undefined>;
    create: (userId: IDType, data: LabelData) => Promise<ILabel>;
    update: (userId: IDType, labelId: IDType, data: PartialLabelData) => Promise<ILabel | undefined>;
    delete: (userId: IDType, labelId: IDType) => Promise<ILabel | undefined>;
    addByNoteId: (noteId: IDType, labelId: IDType) => Promise<INoteLabel>;
    deleteByNoteId: (noteId: IDType, labelIds: IDType[]) => Promise<INoteLabel[]>;
}
