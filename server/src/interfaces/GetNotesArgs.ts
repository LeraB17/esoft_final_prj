import { IDType } from './types';

interface ISort {
    column: string;
    order?: 'asc' | 'desc';
}

export interface GetNotesArgs {
    search?: string;
    labels?: string[];
    placeId?: IDType;
    radius?: number;
    sortDate: ISort;
    limit: number;
    offset: number;
}
