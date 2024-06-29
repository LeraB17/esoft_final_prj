import { IDType } from './types';

interface ISort {
    column: string;
    order?: 'asc' | 'desc';
}

export interface GetNotesArgs {
    sortDate: ISort;
    labels?: string[];
    search?: string;
    placeId?: IDType;
    limit: number;
    offset: number;
}
