import { IUserCreateData } from '#interfaces/IUserCreateData';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, baseQueryWithReauth } from '#services/baseQuery';

export const authAPI = createApi({
    reducerPath: 'authAPI',
    // baseQuery,
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Users'],
    endpoints: (build) => ({
        registerUser: build.mutation<IUserCreateData, IUserCreateData>({
            query: (userData) => ({
                url: `/api/auth/register`,
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});
