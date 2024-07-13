import { ILabel } from '#interfaces/ILabel';
import { IPlace } from '#interfaces/IPlace';
import { ISearchForm } from '#interfaces/ISearchParams';
import { PlaceType } from '#interfaces/MapTypes';

export type PlaceTypeOptionType = {
    id: number;
    name: string;
    orgName: PlaceType;
};
export interface INoteSearchAndFilterProps {
    labels: ILabel[] | undefined;
    places: IPlace[] | undefined;
    types: PlaceTypeOptionType[];
    onChangeSort: (value: any) => void;
    onSubmit: (values: ISearchForm) => void;
}
