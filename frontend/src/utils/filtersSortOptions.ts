import { PlaceType } from '#interfaces/MapTypes';

export const sortByOptions = {
    CREATED_AT_UP: 'Сначала старые',
    CREATED_AT_DOWN: 'Сначала новые',
};

export const radiusOptions = [500, 1000, 3000, 5000, 10000];

export const placeTypeOptions: PlaceType[] = ['house', 'hydro', 'other', 'street', 'transport', 'vegetation'];
