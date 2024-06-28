import { FC } from 'react';
import styles from './NoteImages.module.scss';
import { IImage } from '#interfaces/IImage';
import { IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { STATIC_URL } from '#utils/urls';
import { INoteImagesProps } from './INoteImagesProps';

const NoteImages: FC<INoteImagesProps> = ({ images, isFiles, imageHeight, withDelete = false, handleRemoveImage }) => {
    return (
        <div className={styles.ImageContainer}>
            {images.map((image, index) => (
                <div
                    key={index}
                    className={styles.Image}
                >
                    <img
                        src={isFiles ? URL.createObjectURL(image as File) : STATIC_URL + (image as IImage).uri}
                        alt={`img-${index}`}
                        height={imageHeight}
                    />
                    {withDelete && (
                        <IconButton
                            className={styles.RemoveButton}
                            aria-label="upload"
                            onClick={() => {
                                handleRemoveImage && handleRemoveImage(isFiles ? index : (image as IImage).id);
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
