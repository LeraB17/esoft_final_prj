import AuthPage from '#pages/AuthPage/AuthPage';
import MainPage from '#pages/MainPage/MainPage';
import MapPage from '#pages/MapPage/MapPage';
import ProfilePage from '#pages/ProfilePage/ProfilePage';
import SignUpPage from '#pages/SignUpPage/SignUpPage';
import { AUTH_PAGE, MAIN_PAGE, MAP_PAGE, MAP_USER_PAGE, PERSONAL_ACCOUNT_PAGE, SIGN_UP_PAGE } from '#utils/urls';

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
        path: AUTH_PAGE,
        Component: AuthPage,
    },
    {
        path: MAP_PAGE,
        Component: MapPage,
    },
    {
        path: MAP_USER_PAGE,
        Component: MapPage,
    },
    {
        path: PERSONAL_ACCOUNT_PAGE,
        Component: ProfilePage,
    },
];
