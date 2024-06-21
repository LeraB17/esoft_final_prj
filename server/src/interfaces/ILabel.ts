import { IDType } from './types';

export interface ILabel {
    id: IDType;
    name: string;
    userId: IDType | null;
}

export type LabelData = Omit<ILabel, 'id' | 'userId'>;
export type PartialLabelData = Partial<Omit<LabelData, 'userId'>>;
