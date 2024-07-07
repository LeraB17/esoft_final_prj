import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './NoteLabels.module.scss';
import { ILabel } from '#interfaces/ILabel';
import { Chip, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getSearchString } from '#utils/functions';
import { useMapContext } from '#components/MapProvider/MapProvider';

interface INoteLabelsProps {
    labels: ILabel[];
    withExtra: boolean;
}

const NoteLabels: FC<INoteLabelsProps> = ({ labels, withExtra = false }) => {
    const labelsRef = useRef(null);
    const navigate = useNavigate();

    const { getFilterLink } = useMapContext();

    const handlerClickLabel = (label: ILabel) => {
        const pathTo = getFilterLink();
        navigate(`${pathTo}${getSearchString({ labels: label.id })}`);
    };

    const [visibleLabels, setVisibleLabels] = useState(labels);
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

            labelElements.forEach((labelElement: any) => {
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
        if (withExtra) {
            checkVisibleLabels(labels);
        }
    }, [labels]);

    useEffect(() => {
        if (withExtra) {
            window.addEventListener('resize', () => checkVisibleLabels(labels));

            return () => {
                window.removeEventListener('resize', () => checkVisibleLabels(labels));
            };
        }
    }, [labels]);

    return (
        <Stack
            direction="row"
            className={styles.Labels}
            ref={labelsRef}
        >
            {visibleLabels.map((label, index) => (
                <div
                    key={index}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handlerClickLabel(label)}
                >
                    <Chip
                        className={styles.Label}
                        label={label.name}
                    />
                </div>
            ))}
            {withExtra && extraLabelsCount > 0 && (
                <Chip
                    className={styles.Label}
                    label={`+${extraLabelsCount}`}
                />
            )}
        </Stack>
    );
};

export default NoteLabels;
