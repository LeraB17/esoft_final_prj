import { FC, useEffect } from 'react';
import styles from './NoteSearchAndFilter.module.scss';
import { ISearchForm } from '#interfaces/ISearchParams';
import { INoteSearchAndFilterProps } from './INoteSearchAndFilterProps';
import withLoading from '#components/HOC/withLoading';
import withErrorHandling from '#components/HOC/withErrorHandling';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '#hooks/redux';
import { Controller, useForm } from 'react-hook-form';
import { getSearchString } from '#utils/functions';
import { setLabels, setPlace, setRadius, setSearch, setSort } from '#store/reducers/filterSlice';
import { Box } from '@mui/material';
import { radiusOptions, sortByOptions } from '#utils/filtersSortOptions';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import MultipleSelectUI from '#components/UI/MultipleSelectUI/MultipleSelectUI';
import SelectUI from '#components/UI/SelectUI/SelectUI';
import ButtonUI from '#components/UI/ButtonUI/ButtonUI';
import InputUI from '#components/UI/InputUI/InputUI';

const NoteSearchAndFilter: FC<INoteSearchAndFilterProps> = ({ labels, places, onChangeSort, onSubmit }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const { sortAsc } = useAppSelector((state) => state.filters);

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<ISearchForm>({
        mode: 'onChange',
    });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchParam = params.get('search') || '';
        const labelsParam = params.get('labels')?.split(',') || [];
        const placeParam = params.get('place') || '';
        const sortParam = parseInt(params.get('sort') || '-1', 10);
        const radiusParam = parseInt(params.get('radius') || '0', 10);
        const pageParam = parseInt(params.get('page') || '1', 10);

        const validLabels = labels!.filter((label) => labelsParam.includes(label.id.toString()));
        const validPlace = places?.find((place) => place.id.toString() === placeParam);
        const validRadius = radiusOptions.find((rds) => rds === Number(radiusParam));

        if (
            (validLabels && validLabels.length !== labelsParam.length) ||
            validPlace?.id?.toString() !== placeParam ||
            validRadius !== radiusParam
        ) {
            navigate(
                getSearchString({
                    search: searchParam,
                    labels: validLabels.map((label) => label.id),
                    place: validPlace?.id,
                    radius: validRadius,
                    sort: sortParam > 0 ? 1 : -1,
                    page: pageParam,
                }),
                { replace: true }
            );
        }

        const labels_ = validLabels.map((label) => ({ label: label.name, value: label.id }));

        reset({
            search: searchParam,
            labels: labels_,
            place: validPlace?.id,
            radius: validRadius,
        });

        dispatch(setSearch(searchParam));
        dispatch(setLabels(labels_));
        dispatch(setPlace(validPlace?.id));
        dispatch(setSort(sortParam > 0));
        dispatch(setRadius(validRadius));
    }, [location.search, reset]);

    return (
        <>
            <Box
                sx={{ padding: '10px', paddingTop: '0' }}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Controller
                    name="search"
                    control={control}
                    rules={{ required: 'Придумайте название' }}
                    render={({ field }) => (
                        <InputUI
                            {...field}
                            id="search"
                            label="Поиск"
                            variant="outlined"
                            sx={{ width: '100%', marginBottom: '10px' }}
                            type="text"
                            size="small"
                            inputError={Boolean(errors.search?.message)}
                            helperText={errors.search?.message}
                        />
                    )}
                />

                <Controller
                    name="labels"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                        <MultipleSelectUI
                            {...field}
                            label="Лэйблы"
                            options={labels?.map((item) => ({ label: item.name, value: item.id }))}
                            renderOption={(option: any) => {
                                return <div>{option.label}</div>;
                            }}
                            size="small"
                            selectedOptions={field.value}
                            onChange={(selectedOptions) => {
                                field.onChange(selectedOptions);
                            }}
                        />
                    )}
                />

                <div className={styles.Row}>
                    <div className={`${styles.Item70} ${styles.Item}`}>
                        <PlaceRoundedIcon fontSize="large" />
                        <Controller
                            name="place"
                            control={control}
                            render={({ field }) => (
                                <SelectUI
                                    {...field}
                                    label="Место на карте"
                                    options={places?.map((item) => ({ label: item.name, value: item.id }))}
                                    emptyOption={{ label: 'Все', value: 0 }}
                                    renderOption={(option) => {
                                        return <div className={styles.TextOption}>{option.label}</div>;
                                    }}
                                    size="small"
                                    selectedOption={field.value}
                                    onChange={(selectedOption) => {
                                        field.onChange(selectedOption);
                                    }}
                                />
                            )}
                        />
                    </div>

                    <div className={styles.Item30}>
                        <Controller
                            name="radius"
                            control={control}
                            render={({ field }) => (
                                <SelectUI
                                    {...field}
                                    label="Радиус на карте"
                                    options={radiusOptions?.map((item) => ({ label: item.toString(), value: item }))}
                                    emptyOption={{ label: 'Не задан', value: 0 }}
                                    renderOption={(option) => {
                                        return <div className={styles.TextOption}>{option.label}</div>;
                                    }}
                                    size="small"
                                    selectedOption={field.value}
                                    onChange={(selectedOption) => {
                                        field.onChange(selectedOption);
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className={styles.Row}>
                    <ButtonUI
                        type="button"
                        variant="contained"
                        className={styles.Item30}
                        sx={{ width: '100%' }}
                        onClick={() => onChangeSort(sortAsc)}
                    >
                        {sortAsc ? sortByOptions.CREATED_AT_UP : sortByOptions.CREATED_AT_DOWN}
                    </ButtonUI>

                    <ButtonUI
                        type="submit"
                        variant="contained"
                        className={styles.Item70}
                        sx={{ width: '100%' }}
                    >
                        Поиск
                    </ButtonUI>
                </div>
            </Box>
        </>
    );
};

export default withErrorHandling(withLoading(NoteSearchAndFilter));
