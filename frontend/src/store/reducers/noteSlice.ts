import { IPlace, PlaceData } from '#interfaces/IPlace';
import { IDType } from '#interfaces/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const latitudeDefault = 57.15;
export const longitudeDefault = 65.54;

type PlaceType = IPlace | PlaceData | undefined;

interface NoteState {
    noteId: IDType | undefined;
    place: PlaceType;
    isOpenNote: boolean;
}

const noteDefault: NoteState = {
    noteId: undefined,
    place: undefined,
    isOpenNote: false,
};

const initialState = { ...noteDefault };

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        setPlace(state, action: PayloadAction<PlaceType>) {
            state.place = action.payload;
        },
        setNoteId(state, action: PayloadAction<IDType>) {
            state.noteId = action.payload;
        },
        setIsOpenNote(state) {
            state.isOpenNote = true;
        },
        resetPlace(state) {
            state.place = noteDefault.place;
        },
        resetNoteId(state) {
            state.noteId = noteDefault.noteId;
        },
        resetIsOpenNote(state) {
            state.isOpenNote = false;
        },
        resetState(state) {
            state.place = noteDefault.place;
            state.noteId = noteDefault.noteId;
            state.isOpenNote = noteDefault.isOpenNote;
        },
    },
});

export const { setPlace, resetPlace, setNoteId, resetNoteId, setIsOpenNote, resetIsOpenNote, resetState } =
    noteSlice.actions;

export default noteSlice.reducer;
