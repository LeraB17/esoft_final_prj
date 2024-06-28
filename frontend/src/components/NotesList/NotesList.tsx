import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { noteAPI } from '#services/NoteService';
import { PAGE_SIZE } from '#utils/consts';
import { useAppDispatch } from '#hooks/redux';
import { resetState } from '#store/reducers/noteSlice';
import NotesListInside from './NotesListInside';

const getLimitOffset = (page: number) => {
    return {
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
    };
};

const NotesList: FC = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);

    const dispatch = useAppDispatch();

    const { data: notes, error, isLoading } = noteAPI.useFetchNotesQuery(getLimitOffset(page));
    const { data: totalCount, error: countError, isLoading: countIsLoading } = noteAPI.useFetchTotalCountQuery();

    useEffect(() => {
        dispatch(resetState());
    }, []);

    return (
        <NotesListInside
            isLoading={isLoading || countIsLoading}
            isError={error || countError ? true : false}
            notes={notes}
            totalCount={totalCount}
            page={page}
        />
    );
};

export default NotesList;
