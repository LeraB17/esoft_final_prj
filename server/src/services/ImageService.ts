import { IImage, ImageData } from '../interfaces/IImage';
import { IImageRepo } from '../interfaces/IImageRepo';
import { IImageService } from '../interfaces/IImageService';
import { IDType } from '../interfaces/types';

class ImageService implements IImageService {
    constructor(readonly imageRepo: IImageRepo) {}

    getByNoteId = async (noteId: IDType): Promise<IImage[]> => {
        return this.imageRepo.getByNoteId(noteId);
    };

    getById = async (imageId: IDType): Promise<IImage | undefined> => {
        return this.imageRepo.getById(imageId);
    };

    create = async (noteId: IDType, data: ImageData): Promise<IImage> => {
        return this.imageRepo.create(noteId, data);
    };

    update = async (imageId: IDType, data: ImageData): Promise<IImage | undefined> => {
        return this.imageRepo.update(imageId, data);
    };

    delete = async (imageId: IDType): Promise<IImage | undefined> => {
        return this.imageRepo.delete(imageId);
    };

    createManyByNoteId = async (noteId: IDType, imagesData: ImageData[]): Promise<IImage[]> => {
        return this.imageRepo.createManyByNoteId(noteId, imagesData);
    };

    deleteAllByNoteId = async (noteId: IDType): Promise<IImage[] | undefined> => {
        return this.imageRepo.deleteAllByNoteId(noteId);
    };
}

export default ImageService;
