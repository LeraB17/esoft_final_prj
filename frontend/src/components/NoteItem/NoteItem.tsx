import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './NoteItem.module.scss';
import { Card, Chip, Stack, Typography } from '@mui/material';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import { INoteItemProps } from './INoteItemProps';
import { formatDate } from '#utils/functions';
import { ILabel } from '#interfaces/ILabel';

const NoteItem: FC<INoteItemProps> = ({ note }) => {
    const labelsRef = useRef(null);
    const [visibleLabels, setVisibleLabels] = useState(note.labels);
    const [extraLabelsCount, setExtraLabelsCount] = useState(0);

    const checkVisibleLabels = (labels: ILabel[]) => {
        if (labelsRef.current) {
            const labelsContainer = labelsRef.current;
            const labelElements = Array.from((labelsContainer as any).children);
            const containerWidth = (labelsContainer as any).offsetWidth;
            const maxLines = 3;
            const extraWidth = 50;

            let visibleCount = 0;
            let currentLineWidth = 0;
            let countLines = 1;

            labelElements.forEach((labelElement: any, index: number) => {
                const labelWidth = labelElement.offsetWidth;

                currentLineWidth += labelWidth;

                if (currentLineWidth >= containerWidth) {
                    countLines++;
                    currentLineWidth = labelWidth;
                }

                if (countLines >= maxLines) {
                    return;
                }

                visibleCount++;
            });

            if (labels.length > visibleCount && currentLineWidth + extraWidth > containerWidth) {
                visibleCount--;
            }

            setVisibleLabels(labels.slice(0, visibleCount));
            setExtraLabelsCount(labels.length - visibleCount);
        }
    };

    useLayoutEffect(() => {
        checkVisibleLabels(note.labels);
    }, [note.labels]);

    useEffect(() => {
        window.addEventListener('resize', () => checkVisibleLabels(note.labels));

        return () => {
            window.removeEventListener('resize', () => checkVisibleLabels(note.labels));
        };
    }, [note.labels]);

    return (
        <Card
            variant="outlined"
            className={styles.NoteItem}
        >
            <div>
                <div className={styles.ItemTop}>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            fontWeight: 700,
                        }}
                    >
                        {note.name}
                    </Typography>
                    <div className={styles.ItemTop}>
                        <Typography
                            noWrap
                            sx={{
                                fontWeight: 500,
                            }}
                        >
                            <span>{note.images.length}</span>
                        </Typography>
                        <ImageRoundedIcon color="action" />
                    </div>
                </div>
                <div style={{ display: 'flex' }}>
                    <PlaceRoundedIcon />
                    <Typography
                        noWrap
                        variant="subtitle1"
                        sx={{
                            fontWeight: 500,
                            paddingRight: 2,
                            fontStyle: 'italic',
                        }}
                    >
                        {note.place.name}
                    </Typography>
                </div>
                <Typography className={styles.Text}>{note.text}</Typography>
                <Stack
                    direction="row"
                    className={styles.Labels}
                    ref={labelsRef}
                >
                    {visibleLabels.map((label, index) => (
                        <Chip
                            key={index}
                            className={styles.Label}
                            label={label.name}
                        />
                    ))}
                    {extraLabelsCount > 0 && (
                        <Chip
                            className={styles.Label}
                            label={`+${extraLabelsCount}`}
                        />
                    )}
                </Stack>
            </div>
            <div className={styles.ItemBottom}>
                <Typography
                    noWrap
                    sx={{
                        fontWeight: 500,
                    }}
                >
                    {formatDate(note.updatedAt)}
                </Typography>
            </div>
        </Card>
    );
};

export default NoteItem;
