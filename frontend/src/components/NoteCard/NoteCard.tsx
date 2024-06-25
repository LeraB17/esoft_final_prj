import { FC } from 'react';
import styles from './NoteCard.module.scss';
import { useParams } from 'react-router-dom';
import { noteAPI } from '#services/NoteService';
import NoteHeader from '#components/NoteHeader/NoteHeader';
import { Box, Typography } from '@mui/material';
import NotePlace from '#components/NotePlace/NotePlace';
import NoteLabels from '#components/NoteLabels/NoteLabels';
import NoteImages from '#components/NoteImages/NoteImages';
import { formatDateTimeEnd } from '#utils/functions';

const NoteCard: FC = () => {
    const params = useParams();

    const { data: note, error, isLoading } = noteAPI.useFetchNoteQuery(Number(params.noteID));

    if (isLoading) {
        return <div>Loading...</div>;
    }

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
                            getImagePath={(img) => `http://localhost:5000/static/${img?.uri}`}
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

export default NoteCard;
