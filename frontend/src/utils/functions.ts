import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatDate = (date: Date) => {
    return format(date, 'HH:mm dd.MM.yyyy', { locale: ru });
};

export const formatDateTimeEnd = (date: Date) => {
    return format(date, 'dd.MM.yyyy HH:mm ', { locale: ru });
};
