import { FC } from 'react';
import styles from './NoteCard.module.scss';
import NoteHeader from '#components/NoteHeader/NoteHeader';
import { Box, Typography } from '@mui/material';
import NotePlace from '#components/NotePlace/NotePlace';
import NoteImages from '#components/NoteImages/NoteImages';
import NoteLabels from '#components/NoteLabels/NoteLabels';
import { formatDateTimeEnd } from '#utils/functions';
import { INoteCardProps } from './INoteCardProps';
import withLoading from '#components/HOC/withLoading';
import withErrorHandling from '#components/HOC/withErrorHandling';

const NoteCardInside: FC<INoteCardProps> = ({ note }) => {
    return (
        <>
            <NoteHeader mode="viewMy" />
            <Box sx={{ padding: '5px 15px 15px' }}>
                <div className={styles.NoteCard}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                        }}
                    >
                        {note?.name}
                    </Typography>

                    <NotePlace place={note?.place} />

                    {note?.images && (
                        <NoteImages
                            images={note?.images}
                            isFiles={false}
                            imageHeight={100}
                            withDelete={false}
                        />
                    )}

                    <div className={`scrollable-text-block ${styles.NoteText}`}>
                        <Typography>{note?.text}</Typography>
                    </div>

                    {note?.labels && (
                        <NoteLabels
                            labels={note?.labels}
                            withExtra={false}
                        />
                    )}

                    <div className={styles.NoteDates}>
                        {note && (
                            <>
                                <Typography>
                                    <span className={styles.Date}>Создано:</span>&nbsp;
                                    {formatDateTimeEnd(note?.createdAt)}
                                </Typography>
                                <Typography>
                                    <span className={styles.Date}>Изменено:</span>&nbsp;
                                    {formatDateTimeEnd(note?.updatedAt)}
                                </Typography>
                            </>
                        )}
                    </div>
                </div>
            </Box>
        </>
    );
};

export default withErrorHandling(withLoading(NoteCardInside));
