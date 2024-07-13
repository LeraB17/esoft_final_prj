import { ISearchParams } from '#interfaces/ISearchParams';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatDate = (date: Date) => {
    return format(date, 'HH:mm dd.MM.yyyy', { locale: ru });
};

export const formatDateTimeEnd = (date: Date) => {
    return format(date, 'dd.MM.yyyy HH:mm ', { locale: ru });
};

export const getSearchString = (queryParams: ISearchParams): string => {
    const filteredQueryParams = Object.entries(queryParams).filter(([key, value]) => {
        if (typeof value !== 'number') {
            return value && value.length > 0;
        } else {
            return true;
        }
    });
    const searchParams = new URLSearchParams(filteredQueryParams);

    return `?${searchParams.toString()}`;
};
