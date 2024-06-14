import { PlaceData } from './IPlace';

export interface INote {
    id: number;
    name: string;
    text: string;
    userId: number;
    place: PlaceData;
    publicityStatusId: number;
    createdAt: Date;
    updatedAt: Date;
}

export type NoteData = Omit<INote, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;
export type PartialNoteData = Partial<NoteData>;
