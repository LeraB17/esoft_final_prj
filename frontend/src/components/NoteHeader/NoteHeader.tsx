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
import { useNavigate } from 'react-router-dom';
import { MAP_PAGE } from '#utils/urls';

const NoteHeader: FC<INoteHeader> = ({ mode, color = 'primary' }) => {
    const navigate = useNavigate();

    const addHandler = () => {
        console.log('addHandler');
    };

    const editHandler = () => {
        console.log('editHandler');
    };

    const deleteHandler = () => {
        console.log('deleteHandler');
    };

    const saveShortcutHandler = () => {
        console.log('saveShortcutHandler');
    };

    const closeHandler = () => {
        if (mode === 'create') {
            navigate(MAP_PAGE);
        } else if (mode === 'viewMy' || mode === 'viewOther') {
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
