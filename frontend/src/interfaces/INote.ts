import { IImage } from './IImage';
import { ILabel } from './ILabel';
import { IPlace, PlaceData } from './IPlace';
import { IPublicityStatus } from './IPublicityStatus';
import { IUserAuthor } from './IUser';
import { IDType } from './types';

export interface INote {
    id: IDType;
    userId: IDType;
    name: string;
    text: string;
    images: IImage[];
    place: IPlace;
    publicityStatus: IPublicityStatus;
    labels: ILabel[];
    createdAt: Date;
    updatedAt: Date;
    isShortcut: boolean;
    user: IUserAuthor;
}

export type INoteCreateData = Omit<
    INote,
    'id' | 'labels' | 'createdAt' | 'updatedAt' | 'place' | 'publicityStatus' | 'images' | 'userId'
> & {
    labels: IDType[];
    place: PlaceData;
    publicityStatusId: IDType;
    images: FileList;
};
