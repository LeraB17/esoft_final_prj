import { SelectOptionType } from '#components/UI/MultipleSelectUI/IMultipleSelectUIProps';
import { SortType } from '#services/NoteService';
import { IDType } from './types';

export interface ISearchParams {
    search?: string;
    labels?: IDType | IDType[];
    place?: IDType;
    sort?: SortType;
    radius?: number;
    page?: number;
}

export type ISearchForm = Required<Omit<ISearchParams, 'labels'>> & {
    labels: SelectOptionType[];
};
