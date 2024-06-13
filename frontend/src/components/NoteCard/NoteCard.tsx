import { FC } from 'react';
import styles from './NoteCard.module.scss';
import { useAppSelector } from '#hooks/redux';

const NoteCard: FC = () => {
    const { name, text, coordinates } = useAppSelector((state) => state.note);

    return (
        <div className={styles.NoteCard}>
            <div>NoteCard</div>
            <div>{name}</div>
            <div>{text}</div>
            <div>
                {coordinates.lat} {coordinates.lng}
            </div>
        </div>
    );
};

export default NoteCard;
