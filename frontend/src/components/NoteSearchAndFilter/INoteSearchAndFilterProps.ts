import { ILabel } from '#interfaces/ILabel';
import { IPlace } from '#interfaces/IPlace';
import { ISearchForm } from '#interfaces/ISearchParams';

export interface INoteSearchAndFilterProps {
    labels: ILabel[] | undefined;
    places: IPlace[] | undefined;
    onChangeSort: (value: any) => void;
    onSubmit: (values: ISearchForm) => void;
}
