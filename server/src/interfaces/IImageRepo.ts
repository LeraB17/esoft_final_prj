import { IImage, ImageData, PartialImageData } from './IImage';
import { IDType } from './types';

export interface IImageRepo {
    tableName: string;
    getByNoteId: (noteId: IDType) => Promise<IImage[]>;
    getById: (imageId: IDType) => Promise<IImage | undefined>;
    create: (noteId: IDType, data: ImageData) => Promise<IImage>;
    update: (imageId: IDType, data: PartialImageData) => Promise<IImage | undefined>;
    delete: (imageId: IDType) => Promise<IImage | undefined>;
    createManyByNoteId: (noteId: IDType, imagesData: ImageData[]) => Promise<IImage[]>;
    deleteAllByNoteId: (noteId: IDType) => Promise<IImage[] | undefined>;
    deleteNotFromList: (noteId: IDType, imageIds: IDType[]) => Promise<IImage[] | undefined>;
}
