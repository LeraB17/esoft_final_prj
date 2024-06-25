import { RootState } from '#store/store';
import { getToken } from '#utils/token';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
}

const initialState: AuthState = {
    token: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        clearToken: (state) => {
            state.token = null;
        },
    },
});

export const selectIsAuth = (state: RootState) => Boolean(state.auth.token || getToken());

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
