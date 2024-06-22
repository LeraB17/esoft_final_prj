import { IImage } from './IImage';
import { ILabel } from './ILabel';
import { IPlace } from './IPlace';
import { IPublicityStatus } from './IPublicityStatus';
import { IDType } from './types';

export interface INote {
    id: IDType;
    name: string;
    text: string;
    userId: IDType;
    place: IPlace;
    labels: ILabel[];
    images: IImage[];
    publicityStatus: IPublicityStatus;
    createdAt: Date;
    updatedAt: Date;
}

export type NoteData = Omit<INote, 'id' | 'createdAt' | 'updatedAt' | 'userId' | 'labels' | 'publicityStatus'> & {
    labels: IDType[];
    publicityStatusId: IDType;
};
export type PartialNoteData = Partial<NoteData>;
