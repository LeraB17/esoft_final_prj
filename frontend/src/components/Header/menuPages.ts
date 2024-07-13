import { MAP_PAGE, PROFILE_PAGE } from '#utils/urls';

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
