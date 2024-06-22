import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './NoteItem.module.scss';
import { Card, Chip, Stack, Typography } from '@mui/material';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';

const labels = ['лэйбл 1', 'лэйбл 2', 'sfhalfhlaffa', 'лэйбл 3 лэйбл 3 лэйбл 3лэйбл 3 лэйбл 3 лэйбл 3', 'лэйбл 4'];
// const labels = [
//     'лэйбл 3 лэйбл 3 лэйбл 3лэйбл 3 лэйбл 3 лэйбл 3',
//     'лэйбл 3 лэйбл 3 лэйбл 3лэйбл 3 лэйбл 3 лэйбл 3',
//     'лэйбл 3 лэйбл 3 лэйбл 3лэйбл 3 лэйбл 3 лэйбл 3',
//     'лэйбл 4',
// ];

const NoteItem: FC = () => {
    const labelsRef = useRef(null);
    const [visibleLabels, setVisibleLabels] = useState(labels);
    const [extraLabelsCount, setExtraLabelsCount] = useState(0);

    const checkVisibleLabels = () => {
        if (labelsRef.current) {
            const labelsContainer = labelsRef.current;
            const labelElements = Array.from((labelsContainer as any).children);
            const containerHeight = (labelsContainer as any).offsetHeight;

            let visibleCount = 0;
            let totalHeight = 0;

            labelElements.forEach((labelElement: any, index: number) => {
                const labelHeight = labelElement.offsetHeight;

                if (totalHeight + 2 * labelHeight > containerHeight) {
                    return;
                }

                totalHeight += labelHeight;
                visibleCount++;
            });

            setVisibleLabels(labels.slice(0, visibleCount));
            setExtraLabelsCount(labels.length - visibleCount);
        }
    };

    useLayoutEffect(() => {
        checkVisibleLabels();
    }, [labels]);

    useEffect(() => {
        window.addEventListener('resize', checkVisibleLabels);

        return () => {
            window.removeEventListener('resize', checkVisibleLabels);
        };
    }, [labels]);

    return (
        <Card
            variant="outlined"
            className={styles.NoteItem}
        >
            <div className={styles.ItemTop}>
                <Typography
                    variant="h6"
                    noWrap
                    sx={{
                        fontWeight: 700,
                    }}
                >
                    Название
                </Typography>
                <div className={styles.ItemTop}>
                    <Typography
                        noWrap
                        sx={{
                            fontWeight: 500,
                            marginRight: 1,
                        }}
                    >
                        дата
                    </Typography>
                    <Typography
                        noWrap
                        sx={{
                            fontWeight: 500,
                        }}
                    >
                        <span>N</span>
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
                        marginRight: 1,
                        fontStyle: 'italic',
                    }}
                >
                    Название места
                </Typography>
            </div>
            <Typography className={styles.Text}>
                текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст
                текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст
                текст текст текст текст текст
            </Typography>
            <Stack
                direction="row"
                className={styles.Labels}
                ref={labelsRef}
            >
                {visibleLabels.map((label, index) => (
                    <Chip
                        key={index}
                        className={styles.Label}
                        label={label}
                    />
                ))}
                {extraLabelsCount > 0 && (
                    <Chip
                        className={styles.Label}
                        label={`+${extraLabelsCount}`}
                    />
                )}
            </Stack>
        </Card>
    );
};

export default NoteItem;
