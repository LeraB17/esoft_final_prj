import { FC } from 'react';
import styles from './NoteHeader.module.scss';
import { IconButton } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import { INoteHeader } from './INoteHeader';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ADD_NOTE_PAGE, EDIT_NOTE_PAGE, MAP_PAGE } from '#utils/urls';
import { useAppDispatch, useAppSelector } from '#hooks/redux';
import { resetPlace } from '#store/reducers/noteSlice';
import { noteAPI } from '#services/NoteService';
import { useMapContext } from '#components/MapProvider/MapProvider';

const NoteHeader: FC<INoteHeader> = ({ mode, color = 'primary' }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();

    const { noteId } = useAppSelector((state) => state.note);
    const { userName } = useMapContext();

    const [deleteNote, {}] = noteAPI.useDeleteNoteMutation();

    const addHandler = () => {
        console.log('addHandler');
        navigate(ADD_NOTE_PAGE, { state: { from: location.pathname + location.search } });
    };

    const editHandler = () => {
        console.log('editHandler');
        navigate(EDIT_NOTE_PAGE.replace(':noteID', Number(noteId).toString()));
    };

    const deleteHandler = async () => {
        console.log('deleteHandler');
        if (noteId) {
            await deleteNote({ nickname: userName, id: noteId });
            navigate(MAP_PAGE);
        }
    };

    const saveShortcutHandler = () => {
        console.log('saveShortcutHandler');
    };

    const closeHandler = () => {
        if (location.pathname === ADD_NOTE_PAGE && !location.state?.from) {
            dispatch(resetPlace());
            navigate(MAP_PAGE);
        } else {
            navigate(-1);
        }
    };

    return (
        <div className={styles.NoteFormHeader}>
            <div>
                {mode === 'viewMy' && (
                    <>
                        <IconButton
                            aria-label="create"
                            color={color}
                            onClick={addHandler}
                        >
                            <AddCircleOutlineRoundedIcon fontSize="large" />
                        </IconButton>

                        <IconButton
                            aria-label="edit"
                            color={color}
                            onClick={editHandler}
                        >
                            <DriveFileRenameOutlineRoundedIcon fontSize="large" />
                            {/* <EditNoteRoundedIcon fontSize="large" /> */}
                        </IconButton>

                        <IconButton
                            aria-label="delete"
                            color={color}
                            onClick={deleteHandler}
                        >
                            <DeleteOutlineRoundedIcon fontSize="large" />
                        </IconButton>
                    </>
                )}

                {mode === 'viewOther' && (
                    <IconButton
                        aria-label="save"
                        color={color}
                        onClick={saveShortcutHandler}
                    >
                        <BookmarkBorderRoundedIcon fontSize="large" />
                        {/* <BookmarkRoundedIcon fontSize="large" /> */}
                    </IconButton>
                )}
            </div>
            <div>
                <IconButton
                    aria-label="close"
                    color={color}
                    onClick={closeHandler}
                >
                    <CloseRoundedIcon fontSize="large" />
                </IconButton>
            </div>
        </div>
    );
};

export default NoteHeader;
