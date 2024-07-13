import { forwardRef, useEffect } from 'react';
import styles from './ModalImage.module.scss';
import { IModalImageProps } from './IModalImageProps';
import { IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const ModalImage = forwardRef<HTMLDivElement, IModalImageProps>(({ imgSrc, imageHeight, isOpen, onClose }, ref) => {
    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? onClose(e as any) : null);
        document.body.addEventListener('keydown', closeOnEscapeKey);
        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKey);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className={`modal ${styles.Modal}`}>
            <div
                className={styles.ModalContent}
                ref={ref}
            >
                <img
                    src={imgSrc}
                    width={imageHeight}
                />

                <IconButton
                    className={styles.CloseButton}
                    aria-label="close"
                    onClick={onClose}
                >
                    <CloseRoundedIcon
                        color="primary"
                        fontSize="small"
                    />
                </IconButton>
            </div>
        </div>
    );
});

export default ModalImage;
