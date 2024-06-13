import { FC } from 'react';
import styles from './NoteForm.module.scss';
import { useAppSelector } from '#hooks/redux';

const NoteForm: FC = () => {
    const { name, text, coordinates } = useAppSelector((state) => state.note);

    return (
        <div>
            <div>NoteForm</div>
            <div>{name}</div>
            <div>{text}</div>
            {coordinates && (
                <div>
                    <p>Latitude: {coordinates.lat}</p>
                    <p>Longitude: {coordinates.lng}</p>
                </div>
            )}
        </div>
    );
};

export default NoteForm;
