import { IImage } from '../Image/IImage';
import { ILabel } from '../Label/ILabel';
import { IPlace } from '../Place/IPlace';
import { IPublicityStatus } from '../Status/IPublicityStatus';
import { IDType } from '../types';

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

export type NoteData = Omit<INote, 'id' | 'createdAt' | 'updatedAt' | 'userId' | 'labels' | 'publicityStatus' | 'images'> & {
    labels: IDType[];
    publicityStatusId: IDType;
    images: string[];
    oldImages?: IDType[];
};
export type PartialNoteData = Partial<NoteData> & {
    updatedAt: Date;
};
