export interface IImageWithModalProps {
    index: number;
    imgSrc: string;
    withDelete: boolean;
    imageHeight: number;
    withModal?: boolean;
    handleRemoveImage?: (index: any) => void;
}
