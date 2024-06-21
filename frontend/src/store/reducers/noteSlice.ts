import { LatLngType } from '#interfaces/MapTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const lat = 57.15;
const lng = 65.54;

interface NoteState {
    coordinates: LatLngType;
}

const noteDefault: NoteState = {
    coordinates: { lat, lng },
};

const initialState = { ...noteDefault };

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        setLatLng(state, action: PayloadAction<LatLngType>) {
            const { lat, lng } = action.payload;
            state.coordinates = { lat, lng };
        },
    },
});

export const { setLatLng } = noteSlice.actions;

export default noteSlice.reducer;
