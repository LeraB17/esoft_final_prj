import { setToken, clearToken } from '#store/reducers/authSlice';
import { RootState } from '#store/store';
import { getToken, removeToken, saveToken } from '#utils/token';
import { FetchArgs } from '@reduxjs/toolkit/query';
import { BaseQueryFn, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        // const token = (getState() as RootState).auth.token;
        const token = getToken();
        console.log('token get', token);
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    // отправка запроса
    let result = await baseQuery(args, api, extraOptions);

    console.log('baseQueryWithReauth', result);
    // TODO придумать как красивее проверить
    if (result.error && result.error.status === 401 && (result.error.data as any).message !== 'Invalid credentials') {
        // запрос обновления токенов
        const refreshResult = await baseQuery(`/auth/refresh-tokens`, api, extraOptions);

        console.log('baseQueryWithReauth error', refreshResult);

        if (refreshResult.data) {
            // сохранить новый токен
            const newToken = (refreshResult.data as any).accessToken;
            api.dispatch(setToken(newToken));
            saveToken(newToken);
            // отправка запроса с новым токеном
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(clearToken());
            removeToken();
        }
    }
    return result;
};
