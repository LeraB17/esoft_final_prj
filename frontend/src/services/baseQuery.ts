import { setToken, clearToken } from '#store/reducers/authSlice';
import { RootState } from '#store/store';
import { FetchArgs } from '@reduxjs/toolkit/query';
import { BaseQueryFn, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
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
    let result = await baseQuery(args, api, extraOptions);

    console.log('baseQueryWithReauth', result);
    if (result.error && result.error.status === 401) {
        // try to get a new token
        const refreshResult = await baseQuery('/api/auth/refresh-tokens', api, extraOptions);

        console.log('baseQueryWithReauth error', refreshResult);

        // TODO проверить, работает ли

        if (refreshResult.data) {
            // store the new token
            api.dispatch(setToken(refreshResult.data));
            // retry the initial query
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(clearToken());
        }
    }
    return result;
};
