import NoteCard from '#components/NoteCard/NoteCard';
import NoteForm from '#components/NoteForm/NoteForm';
import NotesList from '#components/NotesList/NotesList';
import AuthPage from '#pages/AuthPage/AuthPage';
import MainPage from '#pages/MainPage/MainPage';
import MapPage from '#pages/MapPage/MapPage';
import ProfilePage from '#pages/ProfilePage/ProfilePage';
import SignUpPage from '#pages/SignUpPage/SignUpPage';
import {
    ADD_NOTE_PAGE,
    LOGIN_PAGE,
    EDIT_NOTE_PAGE,
    MAIN_PAGE,
    MAP_PAGE,
    MAP_USER_PAGE,
    NOTE_PAGE,
    PROFILE_PAGE,
    SIGN_UP_PAGE,
    NOTE_USER_PAGE,
} from '#utils/urls';

export const routes = [
    {
        path: MAIN_PAGE,
        Component: MainPage,
    },
    {
        path: SIGN_UP_PAGE,
        Component: SignUpPage,
    },
    {
        path: LOGIN_PAGE,
        Component: AuthPage,
    },
    {
        path: MAP_PAGE,
        Component: MapPage,
        children: [
            {
                path: '',
                Component: NotesList,
            },
            {
                path: NOTE_PAGE,
                Component: NoteCard,
            },
            {
                path: ADD_NOTE_PAGE,
                Component: NoteForm,
            },
            {
                path: EDIT_NOTE_PAGE,
                Component: NoteForm,
            },
        ],
    },
    {
        path: MAP_USER_PAGE,
        Component: MapPage,
        children: [
            {
                path: '',
                Component: NotesList,
            },
            {
                path: NOTE_USER_PAGE,
                Component: NoteCard,
            },
        ],
    },

    {
        path: PROFILE_PAGE,
        Component: ProfilePage,
    },
];
