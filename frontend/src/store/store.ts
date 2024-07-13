import { combineReducers, configureStore } from '@reduxjs/toolkit';
import noteSlice from './reducers/noteSlice';
import authSlice from './reducers/authSlice';
import filterSlice from './reducers/filterSlice';
import { authAPI } from '#services/AuthService';
import { labelAPI } from '#services/LabelService';
import { noteAPI } from '#services/NoteService';
import { userAPI } from '#services/UserService';

const rootReducer = combineReducers({
    note: noteSlice,
    auth: authSlice,
    filters: filterSlice,
    [authAPI.reducerPath]: authAPI.reducer,
    [labelAPI.reducerPath]: labelAPI.reducer,
    [noteAPI.reducerPath]: noteAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(authAPI.middleware)
                .concat(labelAPI.middleware)
                .concat(noteAPI.middleware)
                .concat(userAPI.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
