import { IImage, ImageData } from './IImage';
import { IImageRepo } from './IImageRepo';
import { IDType } from './types';

export interface IImageService {
    imageRepo: IImageRepo;
    getByNoteId: (noteId: IDType) => Promise<IImage[]>;
    getById: (imageId: IDType) => Promise<IImage | undefined>;
    create: (noteId: IDType, data: ImageData) => Promise<IImage>;
    update: (imageId: IDType, data: ImageData) => Promise<IImage | undefined>;
    delete: (imageId: IDType) => Promise<IImage | undefined>;
    createManyByNoteId: (noteId: IDType, imagesData: ImageData[]) => Promise<IImage[]>;
    deleteAllByNoteId: (noteId: IDType) => Promise<IImage[] | undefined>;
}
