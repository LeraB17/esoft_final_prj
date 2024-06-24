import { IDType } from './types';

export interface IImage {
    id: IDType;
    uri: string;
    noteId: IDType;
    createdAt: Date;
    updatedAt: Date;
}

export type ImageData = Omit<IImage, 'id' | 'createdAt' | 'updatedAt' | 'noteId'>;
