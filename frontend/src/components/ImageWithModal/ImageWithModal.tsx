import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './ImageWithModal.module.scss';
import { IImageWithModalProps } from './IImageWithModalProps';
import ModalImage from '#components/ModalImage/ModalImage';
import { createPortal } from 'react-dom';
import { IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const ImageWithModal: FC<IImageWithModalProps> = ({
    index,
    imgSrc,
    withDelete = false,
    imageHeight,
    withModal = true,
    handleRemoveImage,
}) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const modalRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (imageRef && imageRef.current === event.target) {
            handleOpenModal();
            return;
        }

        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            handleCloseModal();
            return;
        }
    };

    useEffect(() => {
        if (showModal) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showModal]);

    return (
        <div
            className={styles.Image}
            onClick={handleOpenModal}
            style={{ cursor: withModal ? 'pointer' : 'inherit' }}
        >
            <img
                src={imgSrc}
                ref={imageRef}
                alt={`img-${index}`}
                height={imageHeight}
            />
            {withDelete && (
                <IconButton
                    className={styles.RemoveButton}
                    aria-label="upload"
                    onClick={(e: React.SyntheticEvent) => {
                        e.stopPropagation();
                        handleRemoveImage && handleRemoveImage(index);
                    }}
                >
                    <CloseRoundedIcon
                        color="primary"
                        fontSize="small"
                    />
                </IconButton>
            )}

            {withModal && showModal
                ? createPortal(
                      <ModalImage
                          ref={modalRef}
                          imgSrc={imgSrc}
                          isOpen={showModal}
                          imageHeight={500}
                          onClose={(e: React.SyntheticEvent) => {
                              e.stopPropagation();
                              handleCloseModal();
                          }}
                      />,
                      document.body
                  )
                : null}
        </div>
    );
};

export default ImageWithModal;
