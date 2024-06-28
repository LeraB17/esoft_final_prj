import path from 'path';
import fs from 'fs';
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

    deleteFromFolder = async (images: IImage[]) => {
        images.forEach((image) => {
            const imagePath = path.join(__dirname, '..', '..', 'static', image.uri);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting image:', err);
                }
            });
        });
    };

    deleteAllByNoteId = async (noteId: IDType): Promise<IImage[] | undefined> => {
        const deletedImages = await this.imageRepo.deleteAllByNoteId(noteId);

        if (deletedImages) {
            this.deleteFromFolder(deletedImages);
        }
        return deletedImages;
    };

    deleteNotFromList = async (noteId: IDType, imageIds: IDType[]): Promise<IImage[] | undefined> => {
        if (imageIds?.length === 0) {
            return undefined;
        }

        const deletedImages = await this.imageRepo.deleteNotFromList(noteId, imageIds);

        if (deletedImages) {
            this.deleteFromFolder(deletedImages);
        }
        return deletedImages;
    };
}

export default ImageService;
