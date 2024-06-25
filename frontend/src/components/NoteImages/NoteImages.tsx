import { FC } from 'react';
import styles from './NoteImages.module.scss';
import { IImage } from '#interfaces/IImage';
import { IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface INoteImagesProps {
    images: IImage[] | File[];
    getImagePath: (obj: any) => string;
    imageHeight: number;
    withDelete: boolean;
    handleRemoveImage?: (index: number) => void;
}

const NoteImages: FC<INoteImagesProps> = ({
    images,
    getImagePath,
    imageHeight,
    withDelete = false,
    handleRemoveImage,
}) => {
    return (
        <div className={styles.ImageContainer}>
            {images.map((image, index) => (
                <div
                    key={index}
                    className={styles.Image}
                >
                    <img
                        src={getImagePath(image)}
                        alt={`img-${index}`}
                        height={imageHeight}
                    />
                    {withDelete && (
                        <IconButton
                            className={styles.RemoveButton}
                            aria-label="upload"
                            onClick={() => {
                                handleRemoveImage && handleRemoveImage(index);
                            }}
                        >
                            <CloseRoundedIcon
                                color="primary"
                                fontSize="small"
                            />
                        </IconButton>
                    )}
                </div>
            ))}
        </div>
    );
};

export default NoteImages;
