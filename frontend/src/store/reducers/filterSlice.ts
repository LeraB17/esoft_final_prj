import { SelectOptionType } from '#components/UI/MultipleSelectUI/IMultipleSelectUIProps';
import { LocationType, PlaceType } from '#interfaces/MapTypes';
import { IDType } from '#interfaces/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface FilterState {
    search: string;
    labels: SelectOptionType[];
    place: IDType | undefined;
    userLocation: LocationType;
    radius: number | undefined;
    type: PlaceType | undefined;
    sortAsc: boolean;
}

const filtersDefault: FilterState = {
    search: '',
    labels: [],
    place: undefined,
    userLocation: [undefined, undefined],
    radius: undefined,
    type: undefined,
    sortAsc: false,
};

const initialState = { ...filtersDefault };

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSort(state, action: PayloadAction<boolean>) {
            state.sortAsc = action.payload;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
        setLabels(state, action: PayloadAction<SelectOptionType[]>) {
            state.labels = action.payload;
        },
        setPlace(state, action: PayloadAction<IDType | undefined>) {
            state.place = action.payload;
        },
        setUserLocation(state, action: PayloadAction<LocationType>) {
            state.userLocation = action.payload;
        },
        setRadius(state, action: PayloadAction<number | undefined>) {
            state.radius = action.payload;
        },
        setType(state, action: PayloadAction<PlaceType | undefined>) {
            state.type = action.payload;
        },
        resetFilters(state) {
            state.sortAsc = filtersDefault.sortAsc;
            state.search = filtersDefault.search;
            state.labels = filtersDefault.labels;
            state.place = filtersDefault.place;
            state.userLocation = filtersDefault.userLocation;
            state.radius = filtersDefault.radius;
        },
    },
});

export const { setSort, setSearch, setLabels, setPlace, setUserLocation, setRadius, setType, resetFilters } =
    filtersSlice.actions;

export default filtersSlice.reducer;
