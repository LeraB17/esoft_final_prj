import { ILabel } from './ILabel';
import { LatLngType } from './MapTypes';
import { IDType } from './types';

export interface INote {
    id: IDType;
    userId: IDType;
    name: string;
    text: string;
    imageURL: string;
    coordinates: LatLngType;
    publicityStatusId: number;
    // labels: ILabel[];
    labels: IDType[];
    // created_at: Date;
}

export type INoteCreateData = Omit<INote, 'id'>;
