import { combineReducers, configureStore } from '@reduxjs/toolkit';
import noteSlice from './reducers/noteSlice';
import authSlice from './reducers/authSlice';
import filterSlice from './reducers/filterSlice';
import { authAPI } from '#services/AuthService';
import { labelAPI } from '#services/LabelService';
import { noteAPI } from '#services/NoteService';

const rootReducer = combineReducers({
    note: noteSlice,
    auth: authSlice,
    filters: filterSlice,
    [authAPI.reducerPath]: authAPI.reducer,
    [labelAPI.reducerPath]: labelAPI.reducer,
    [noteAPI.reducerPath]: noteAPI.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(authAPI.middleware).concat(labelAPI.middleware).concat(noteAPI.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
