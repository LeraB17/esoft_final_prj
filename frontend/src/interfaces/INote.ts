import { ILabel } from './ILabel';
import { IPlace, PlaceData } from './IPlace';
import { IPublicityStatus } from './IPublicityStatus';
import { IDType } from './types';

export interface INote {
    id: IDType;
    userId: IDType;
    name: string;
    text: string;
    images: string[];
    place: IPlace;
    publicityStatus: IPublicityStatus;
    labels: ILabel[];
    createdAt: Date;
    updatedAt: Date;
}

export type INoteCreateData = Omit<INote, 'id' | 'labels' | 'createdAt' | 'updatedAt' | 'place' | 'publicityStatus'> & {
    labels: IDType[];
    place: PlaceData;
    publicityStatusId: IDType;
};
