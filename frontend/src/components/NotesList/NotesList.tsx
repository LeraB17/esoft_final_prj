import { FC } from 'react';
import styles from './NotesList.module.scss';
import NoteItem from '#components/NoteItem/NoteItem';
import NoteSearchAndFilter from '#components/NoteSearchAndFilter/NoteSearchAndFilter';
import PaginationUI from '#components/UI/PaginationUI/PaginationUI';
import { Link, useLocation } from 'react-router-dom';
import { PaginationItem } from '@mui/material';
import { noteAPI } from '#services/NoteService';
import { PAGE_SIZE } from '#utils/consts';

const getLimitOffset = (page: number) => {
    return {
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
    };
};

const getPageCount = (totalCount: number) => {
    return Math.ceil(totalCount / PAGE_SIZE);
};

const NotesList: FC = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);

    const { data: notes, error, isLoading, refetch } = noteAPI.useFetchNotesQuery(getLimitOffset(page));
    const { data: totalCount, error: countError, isLoading: countIsLoading } = noteAPI.useFetchTotalCountQuery();

    if (isLoading || countIsLoading) {
        return <div>Loading...</div>;
    }

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

export default NotesList;
