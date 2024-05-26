import { FC } from 'react';
import styles from './NotesList.module.scss';
import NoteItem from '#components/NoteItem/NoteItem';

const NotesList: FC = () => {
    return (
        <div className={styles.NotesList}>
            <div>поиск</div>
            <div>
                <NoteItem />
                <NoteItem />
                <NoteItem />
                <NoteItem />
            </div>
        </div>
    );
};

export default NotesList;
