import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '#services/baseQuery';
import { IUser } from '#interfaces/IUser';
import { FetchArgs } from '#interfaces/IFetch';

interface SubscriptionData {
    nickname: string;
    data: { targetUserName: string };
}

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Users'],
    endpoints: (build) => ({
        fetchUserInfo: build.query<IUser, FetchArgs>({
            query: ({ nickname }) => ({
                url: `/users/nickname/${nickname}`,
            }),
            providesTags: [{ type: 'Users' }],
        }),
        createSubscription: build.mutation<Response, SubscriptionData>({
            query: ({ nickname, data }) => ({
                url: `users/${nickname}/subscriptions`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),
        deleteSubscription: build.mutation<Response, SubscriptionData>({
            query: ({ nickname, data }) => ({
                url: `users/${nickname}/subscriptions`,
                method: 'DELETE',
                body: data,
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),
    }),
});
