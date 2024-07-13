import { FC } from 'react';
import styles from './NoteImages.module.scss';
import { IImage } from '#interfaces/IImage';
import { STATIC_URL } from '#utils/urls';
import { INoteImagesProps } from './INoteImagesProps';
import ImageWithModal from '#components/ImageWithModal/ImageWithModal';

const NoteImages: FC<INoteImagesProps> = ({ images, isFiles, imageHeight, withDelete = false, handleRemoveImage }) => {
    const getPath = isFiles
        ? (value: File | IImage) => URL.createObjectURL(value as File)
        : (value: File | IImage) => STATIC_URL + (value as IImage).uri;

    return (
        <div className={styles.ImageContainer}>
            {images.map((image, index) => (
                <ImageWithModal
                    key={index}
                    index={isFiles ? index : (image as IImage).id}
                    imgSrc={getPath(image)}
                    withDelete={withDelete}
                    imageHeight={imageHeight}
                    handleRemoveImage={handleRemoveImage}
                />
            ))}
        </div>
    );
};

export default NoteImages;
