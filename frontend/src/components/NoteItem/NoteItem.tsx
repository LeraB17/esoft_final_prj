import { FC } from 'react';
import styles from './NoteItem.module.scss';
import { Card, Typography } from '@mui/material';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import { INoteItemProps } from './INoteItemProps';
import { formatDate } from '#utils/functions';
import { Link, useParams } from 'react-router-dom';
import { NOTE_PAGE, NOTE_USER_PAGE } from '#utils/urls';
import NotePlace from '#components/NotePlace/NotePlace';
import NoteLabels from '#components/NoteLabels/NoteLabels';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';

const NoteItem: FC<INoteItemProps> = ({ note }) => {
    const { username } = useParams();

    const getLink = () => {
        let link;
        if (username) {
            link = NOTE_USER_PAGE.replace(':username', username);
        } else if (note?.isShortcut) {
            link = NOTE_USER_PAGE.replace(':username', note.user?.nickname);
        } else {
            link = NOTE_PAGE;
        }
        return link.replace(':noteID', note.id.toString());
    };

    return (
        <Card
            variant="outlined"
            className={styles.NoteItem}
        >
            <div>
                <div className={styles.ItemTop}>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            fontWeight: 700,
                        }}
                    >
                        <Link
                            to={getLink()}
                            className={styles.NoteName}
                        >
                            {note.name}
                        </Link>
                    </Typography>
                    <div className={styles.ItemTop}>
                        <Typography
                            noWrap
                            sx={{
                                fontWeight: 500,
                            }}
                        >
                            <span>{note.images.length}</span>
                        </Typography>
                        <ImageRoundedIcon color="action" />
                        {note.isShortcut && <BookmarkRoundedIcon />}
                    </div>
                </div>

                <NotePlace place={note?.place} />

                <Typography className={styles.Text}>{note.text}</Typography>

                <NoteLabels
                    labels={note?.labels}
                    withExtra={true}
                />
            </div>
            <div className={styles.ItemBottom}>
                <Typography
                    noWrap
                    sx={{
                        fontWeight: 500,
                    }}
                >
                    {formatDate(note.createdAt)}
                </Typography>
            </div>
        </Card>
    );
};

export default NoteItem;
