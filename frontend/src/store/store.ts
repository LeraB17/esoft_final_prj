import { combineReducers, configureStore } from '@reduxjs/toolkit';
import noteSlice from './reducers/noteSlice';

const rootReducer = combineReducers({
    note: noteSlice,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
