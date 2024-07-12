import { ChangeEvent, FC, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { noteAPI } from '#services/NoteService';
import { PAGE_SIZE } from '#utils/consts';
import { useAppDispatch, useAppSelector } from '#hooks/redux';
import { resetState } from '#store/reducers/noteSlice';
import NotesListInside from './NotesListInside';
import NoteSearchAndFilter from '#components/NoteSearchAndFilter/NoteSearchAndFilter';
import { setSort } from '#store/reducers/filterSlice';
import { ISearchForm } from '#interfaces/ISearchParams';
import { getSearchString } from '#utils/functions';
import { labelAPI } from '#services/LabelService';
import { useMapContext } from '#components/MapProvider/MapProvider';
import AccordionUI from '#components/UI/AccordionUI/AccordionUI';
import { Typography } from '@mui/material';
import { placeTypeOptions } from '#utils/filtersSortOptions';
import { getLabelNameByType } from '#utils/mapFunctions';
import { PlaceTypeOptionType } from '#components/NoteSearchAndFilter/INoteSearchAndFilterProps';

const NotesList: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { search, labels, place, userLocation, radius, type, sortAsc } = useAppSelector((state) => state.filters);
    const dispatch = useAppDispatch();

    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);

    const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
        query.set('page', value.toString());
        navigate(`${location.pathname}?${query.toString()}`);
    };

    const { userName } = useMapContext();

    const {
        data: notes,
        error,
        isFetching,
        refetch,
    } = noteAPI.useFetchNotesQuery(
        {
            search,
            labels: labels.map((label) => label.value),
            place,
            center: userLocation,
            radius,
            type,
            sort: sortAsc ? 1 : -1,
            limit: PAGE_SIZE,
            offset: (page - 1) * PAGE_SIZE,
            nickname: userName,
        },
        { skip: userName === '' }
    );
    const {
        data: totalCount,
        error: countError,
        isLoading: countIsLoading,
    } = noteAPI.useFetchTotalCountQuery(
        {
            search,
            labels: labels.map((label) => label.value),
            place,
            center: userLocation,
            radius,
            type,
            nickname: userName,
        },
        { skip: userName === '' }
    );

    const { data: allLabels, error: errorL, isLoading: isLoadingL } = labelAPI.useFetchLabelsQuery();
    const {
        data: allPlaces,
        error: errorP,
        isLoading: isLoadingP,
    } = noteAPI.useFetchPlacesQuery({ nickname: userName }, { skip: userName === '' });

    const placeTypes = useMemo(() => {
        const options: PlaceTypeOptionType[] = placeTypeOptions?.map((type, index) => ({
            id: index + 1,
            name: getLabelNameByType(type),
            orgName: type,
        }));
        return options;
    }, [placeTypeOptions]);

    const handleSortChange = (value: boolean) => {
        const res = value ? -1 : 1;
        query.set('sort', res.toString());
        dispatch(setSort(!value));
        navigate(`${location.pathname}?${query.toString()}`);
    };

    const onSubmit = async (values: ISearchForm) => {
        refetch();
        navigate(
            getSearchString({
                search: values.search,
                labels: values.labels.map((label) => label.value),
                place: values.place,
                radius: values.radius,
                type: placeTypes.filter((type) => type.id === values.type)[0]?.orgName,
                sort: sortAsc ? 1 : -1,
            })
        );
    };

    useEffect(() => {
        dispatch(resetState());
    }, []);

    useEffect(() => {
        if (notes) {
            refetch();
        }
    }, [sortAsc, refetch]);

    return (
        <>
            <AccordionUI accordionSummary={<Typography>Поиск</Typography>}>
                <NoteSearchAndFilter
                    isLoading={isLoadingL || isLoadingP}
                    isError={!!errorL || !!errorP}
                    labels={allLabels?.data}
                    places={allPlaces?.data}
                    types={placeTypes}
                    onChangeSort={handleSortChange}
                    onSubmit={onSubmit}
                />
            </AccordionUI>

            <NotesListInside
                isLoading={isFetching || countIsLoading}
                isError={!!error || !!countError}
                notes={notes}
                totalCount={totalCount && totalCount > 0 ? totalCount : undefined}
                page={page}
                onChangePage={handlePageChange}
            />
        </>
    );
};

export default NotesList;
