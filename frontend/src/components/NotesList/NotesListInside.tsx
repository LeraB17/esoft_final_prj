import { FC } from 'react';
import styles from './NotesList.module.scss';
import NoteItem from '#components/NoteItem/NoteItem';
import PaginationUI from '#components/UI/PaginationUI/PaginationUI';
import { PAGE_SIZE } from '#utils/consts';
import { INotesListInsideProps } from './INotesListInsideProps';
import withLoading from '#components/HOC/withLoading';
import withErrorHandling from '#components/HOC/withErrorHandling';
import { Typography } from '@mui/material';

const getPageCount = (totalCount: number) => {
    return Math.ceil(totalCount / PAGE_SIZE);
};

const NotesListInside: FC<INotesListInsideProps> = ({ notes, totalCount, page, onChangePage }) => {
    return (
        <>
            {totalCount ? (
                <div className={styles.NotesList}>
                    {notes?.map((note) => (
                        <NoteItem
                            key={note.id}
                            note={note}
                        />
                    ))}
                </div>
            ) : (
                <Typography>Ничего не найдено</Typography>
            )}

            <div className={styles.Bottom}>
                {totalCount && (
                    <PaginationUI
                        count={getPageCount(totalCount)}
                        currentPage={page}
                        siblingCount={2}
                        boundaryCount={2}
                        onChange={onChangePage}
                    />
                )}
            </div>
        </>
    );
};

export default withErrorHandling(withLoading(NotesListInside));
