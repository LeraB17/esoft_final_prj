import { FC, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '#hooks/redux';
import { noteAPI } from '#services/NoteService';
import NoteFormInside from './NoteFormInside';
import { ADD_NOTE_PAGE, MAP_PAGE } from '#utils/urls';
import { labelAPI } from '#services/LabelService';
import { useMapContext } from '#components/MapProvider/MapProvider';

const NoteForm: FC = () => {
    const { place } = useAppSelector((state) => state.note);
    const { userName } = useMapContext();

    const location = useLocation();
    const navigate = useNavigate();
    const { noteID } = useParams();

    useEffect(() => {
        if (!place && !noteID) {
            navigate(MAP_PAGE);
        }
    }, []);

    const { data: labels, error: errorL, isLoading: isLoadingL } = labelAPI.useFetchLabelsQuery();
    const { data: statuses, error: errorS, isLoading: isLoadingS } = noteAPI.useFetchPublicityStatusesQuery();
    const {
        data: note,
        error: errorN,
        isLoading: isLoadingN,
    } = noteAPI.useFetchNoteQuery(
        {
            nickname: userName,
            id: Number(noteID),
        },
        { skip: !noteID }
    );

    return (
        <>
            <NoteFormInside
                isLoading={isLoadingL || isLoadingS || isLoadingN}
                isError={errorL || errorS || errorN ? true : false}
                isEdit={location.pathname !== ADD_NOTE_PAGE}
                note={note}
                labels={labels?.data}
                statuses={statuses}
            />
        </>
    );
};

export default NoteForm;
