import { IImage } from '#interfaces/IImage';

export interface INoteImagesProps {
    images: IImage[] | File[];
    isFiles: boolean;
    imageHeight: number;
    withDelete: boolean;
    handleRemoveImage?: (index: any) => void;
}
