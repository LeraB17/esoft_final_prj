export interface IModalImageProps {
    imgSrc: string;
    isOpen: boolean;
    imageHeight: number;
    ref?: HTMLDivElement;
    onClose: (e: React.SyntheticEvent) => void | (() => void);
}
