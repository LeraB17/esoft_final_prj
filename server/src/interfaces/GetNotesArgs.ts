import { IDType } from './types';

interface ISort {
    column: string;
    order?: 'asc' | 'desc';
}

export interface GetNotesArgs {
    search?: string;
    labels?: string[];
    placeId?: IDType;
    center?: [number, number];
    radius?: number;
    type?: string;
    sortDate?: ISort;
    statuses?: IDType[];
    limit: number;
    offset: number;
}
