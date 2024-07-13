import { IDType } from './types';

export interface ILabel {
    id: IDType;
    name: string;
    userId: IDType | null;
}
