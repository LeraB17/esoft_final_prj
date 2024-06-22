import { FC } from 'react';
import styles from './NotesList.module.scss';
import NoteItem from '#components/NoteItem/NoteItem';
import NoteSearchAndFilter from '#components/NoteSearchAndFilter/NoteSearchAndFilter';
import PaginationUI from '#components/UI/PaginationUI/PaginationUI';
import { Link, useLocation } from 'react-router-dom';
import { PaginationItem } from '@mui/material';

const NotesList: FC = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);

    return (
        <>
            <NoteSearchAndFilter />

            <div className={styles.NotesList}>
                <NoteItem />
                <NoteItem />
                <NoteItem />
                <NoteItem />
            </div>

            <div className={styles.Bottom}>
                <PaginationUI
                    count={4}
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
            </div>
        </>
    );
};

export default NotesList;
