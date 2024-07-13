import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '#services/baseQuery';
import { ILabel } from '#interfaces/ILabel';
import { IResponseData } from '#interfaces/IResponseData';

export const labelAPI = createApi({
    reducerPath: 'labelAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Labels'],
    endpoints: (build) => ({
        fetchLabels: build.query<IResponseData<ILabel[]>, void>({
            query: () => ({
                url: `/labels`,
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({ type: 'Labels' as const, id })),
                          { type: 'Labels', id: 'LIST' },
                      ]
                    : [{ type: 'Labels', id: 'LIST' }],
        }),
    }),
});
