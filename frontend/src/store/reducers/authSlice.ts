import { IUser } from '#interfaces/IUser';
import { RootState } from '#store/store';
import { getToken } from '#utils/token';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    user: IUser | undefined;
}

const initialState: AuthState = {
    token: null,
    user: undefined,
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
        setUser(state, action: PayloadAction<IUser | undefined>) {
            state.user = action.payload;
        },
        resetUser(state) {
            state.user = undefined;
        },
    },
});

export const selectIsAuth = (state: RootState) => Boolean(state.auth.token || getToken());

export const { setToken, clearToken, setUser } = authSlice.actions;

export default authSlice.reducer;
