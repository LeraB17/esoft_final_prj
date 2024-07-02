import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { noteAPI } from '#services/NoteService';
import { useAppDispatch, useAppSelector } from '#hooks/redux';
import { setIsOpenNote, setNoteId, setPlace } from '#store/reducers/noteSlice';
import NoteCardInside from './NoteCardInside';
import { useMapContext } from '#components/MapProvider/MapProvider';

const NoteCard: FC = () => {
    const { noteID } = useParams();
    const { userName } = useMapContext();
    const dispatch = useAppDispatch();

    const {
        data: note,
        error,
        isLoading,
    } = noteAPI.useFetchNoteQuery({
        nickname: userName,
        id: Number(noteID),
    });

    useEffect(() => {
        if (note) {
            dispatch(setPlace(note?.place));
            dispatch(setNoteId(note?.id));
            dispatch(setIsOpenNote());
        }
    }, [note]);

    return (
        <NoteCardInside
            isLoading={isLoading}
            isError={error ? true : false}
            note={note}
        />
    );
};

export default NoteCard;
