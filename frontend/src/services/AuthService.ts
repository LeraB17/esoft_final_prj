import { IUserCreateData } from '#interfaces/IUserCreateData';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '#services/baseQuery';
import { IUserLoginData } from '#interfaces/IUserLoginData';
import { IUser, IUserRegisterRes, IUserRes } from '#interfaces/IUser';

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['AuthUsers'],
    endpoints: (build) => ({
        registerUser: build.mutation<IUserRegisterRes, IUserCreateData>({
            query: (userData) => ({
                url: `/auth/register`,
                method: 'POST',
                body: userData,
            }),
        }),
        loginUser: build.mutation<IUserRes, IUserLoginData>({
            query: (userData) => ({
                url: `/auth/login`,
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: [{ type: 'AuthUsers' }],
        }),
        logoutUser: build.mutation<void, void>({
            query: () => ({
                url: `/auth/logout`,
                method: 'POST',
            }),
            invalidatesTags: [{ type: 'AuthUsers' }],
        }),
        fetchInfo: build.query<IUser, void>({
            query: () => ({
                url: `/users/current`,
            }),
            providesTags: [{ type: 'AuthUsers' }],
        }),
    }),
});
