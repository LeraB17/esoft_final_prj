import { FC } from 'react';
import styles from './NotesList.module.scss';
import NoteItem from '#components/NoteItem/NoteItem';
import NoteSearchAndFilter from '#components/NoteSearchAndFilter/NoteSearchAndFilter';
import PaginationUI from '#components/UI/PaginationUI/PaginationUI';
import { Link } from 'react-router-dom';
import { PaginationItem } from '@mui/material';
import { PAGE_SIZE } from '#utils/consts';
import { INotesListInsideProps } from './INotesListInsideProps';
import withLoading from '#components/HOC/withLoading';
import withErrorHandling from '#components/HOC/withErrorHandling';

const getPageCount = (totalCount: number) => {
    return Math.ceil(totalCount / PAGE_SIZE);
};

const NotesListInside: FC<INotesListInsideProps> = ({ notes, totalCount, page }) => {
    return (
        <>
            <NoteSearchAndFilter />

            <div className={styles.NotesList}>
                {notes?.map((note) => (
                    <NoteItem
                        key={note.id}
                        note={note}
                    />
                ))}
            </div>

            <div className={styles.Bottom}>
                {totalCount && (
                    <PaginationUI
                        count={getPageCount(totalCount)}
                        currentPage={page}
                        siblingCount={2}
                        boundaryCount={2}
                        renderItem={(item) => (
                            <PaginationItem
                                component={Link}
                                to={`${item.page === 1 ? '' : `?page=${item.page}`}`}
                                {...item}
                            />
                        )}
                    />
                )}
            </div>
        </>
    );
};

export default withErrorHandling(withLoading(NotesListInside));
