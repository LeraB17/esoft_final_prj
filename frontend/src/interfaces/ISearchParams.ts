import { SelectOptionType } from '#components/UI/MultipleSelectUI/IMultipleSelectUIProps';
import { SortType } from './IFetch';
import { PlaceType } from './MapTypes';
import { IDType } from './types';

export interface ISearchParams {
    search?: string;
    labels?: IDType | IDType[];
    place?: IDType;
    sort?: SortType;
    radius?: number;
    type?: PlaceType;

    page?: number;
}

export type ISearchForm = Required<Omit<ISearchParams, 'labels' | 'type'>> & {
    labels: SelectOptionType[];
    type: IDType;
};
