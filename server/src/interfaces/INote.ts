import { ILabel } from './ILabel';
import { PlaceData } from './IPlace';
import { IDType } from './types';

export interface INote {
    id: IDType;
    name: string;
    text: string;
    userId: IDType;
    place: PlaceData;
    labels: ILabel[];
    // labels: IDType[];
    publicityStatusId: IDType;
    createdAt: Date;
    updatedAt: Date;
}

export type NoteData = Omit<INote, 'id' | 'createdAt' | 'updatedAt' | 'userId' | 'labels'> & {
    labels: IDType[];
};
export type PartialNoteData = Partial<NoteData>;
