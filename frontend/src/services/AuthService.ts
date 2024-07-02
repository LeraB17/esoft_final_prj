import { IUserCreateData } from '#interfaces/IUserCreateData';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '#services/baseQuery';
import { IUserLoginData } from '#interfaces/IUserLoginData';
import { IUser } from '#interfaces/IUser';

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Users'],
    endpoints: (build) => ({
        registerUser: build.mutation<IUserCreateData, IUserCreateData>({
            query: (userData) => ({
                url: `/auth/register`,
                method: 'POST',
                body: userData,
            }),
        }),
        loginUser: build.mutation<IUserLoginData, IUserLoginData>({
            query: (userData) => ({
                url: `/auth/login`,
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: [{ type: 'Users' }],
        }),
        logoutUser: build.mutation<void, void>({
            query: () => ({
                url: `/auth/logout`,
                method: 'POST',
            }),
            invalidatesTags: [{ type: 'Users' }],
        }),
        fetchInfo: build.query<IUser, void>({
            query: () => ({
                url: `/auth/current`,
            }),
            providesTags: [{ type: 'Users' }],
        }),
    }),
});
