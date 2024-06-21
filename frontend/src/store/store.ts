import { combineReducers, configureStore } from '@reduxjs/toolkit';
import noteSlice from './reducers/noteSlice';
import authSlice from './reducers/authSlice';
import { authAPI } from '#services/AuthService';

const rootReducer = combineReducers({
    note: noteSlice,
    auth: authSlice,
    [authAPI.reducerPath]: authAPI.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authAPI.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
