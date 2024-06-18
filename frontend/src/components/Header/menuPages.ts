import { MAIN_PAGE, MAP_PAGE, PROFILE_PAGE } from '#utils/urls';

export type PageType = { name: string; link: string };

export const pages: PageType[] = [
    {
        name: 'Моя карта',
        link: MAP_PAGE,
    },
    {
        name: 'Мой профиль',
        link: PROFILE_PAGE,
    },
];

export const settings: PageType[] = [
    {
        name: 'Мой профиль',
        link: PROFILE_PAGE,
    },
    {
        name: 'Выйти',
        link: MAIN_PAGE,
    },
];
