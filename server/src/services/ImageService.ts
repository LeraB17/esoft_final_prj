import { IImage, ImageData, PartialImageData } from '../interfaces/Image/IImage';
import { IImageRepo } from '../interfaces/Image/IImageRepo';
import { IImageService } from '../interfaces/Image/IImageService';
import { IDType } from '../interfaces/types';
import { deleteFromFolder } from '../utils/functions';

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

    update = async (imageId: IDType, data: PartialImageData): Promise<IImage | undefined> => {
        return this.imageRepo.update(imageId, data);
    };

    delete = async (imageId: IDType): Promise<IImage | undefined> => {
        return this.imageRepo.delete(imageId);
    };

    createManyByNoteId = async (noteId: IDType, imagesData: ImageData[]): Promise<IImage[]> => {
        return this.imageRepo.createManyByNoteId(noteId, imagesData);
    };

    deleteAllByNoteId = async (noteId: IDType): Promise<IImage[] | undefined> => {
        const deletedImages = await this.imageRepo.deleteAllByNoteId(noteId);

        if (deletedImages) {
            deleteFromFolder(deletedImages.map((img) => img.uri));
        }
        return deletedImages;
    };

    deleteNotFromList = async (noteId: IDType, imageIds: IDType[]): Promise<IImage[] | undefined> => {
        if (imageIds?.length === 0) {
            return undefined;
        }

        const deletedImages = await this.imageRepo.deleteNotFromList(noteId, imageIds);

        if (deletedImages) {
            deleteFromFolder(deletedImages.map((img) => img.uri));
        }
        return deletedImages;
    };
}

export default ImageService;
