import { setToken, clearToken } from '#store/reducers/authSlice';
import { getToken, removeToken, saveToken } from '#utils/token';
import { FetchArgs } from '@reduxjs/toolkit/query';
import { BaseQueryFn, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();
export const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = getToken();
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
    await mutex.waitForUnlock();
    // отправка запроса
    let result = await baseQuery(args, api, extraOptions);

    console.log('baseQueryWithReauth', result);
    // TODO придумать как красивее проверить
    if (result.error && result.error.status === 401 && (result.error.data as any).message !== 'Invalid credentials') {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
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
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};
