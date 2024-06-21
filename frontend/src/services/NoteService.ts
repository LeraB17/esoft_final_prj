import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '#services/baseQuery';
import { INoteCreateData } from '#interfaces/INote';

export const noteAPI = createApi({
    reducerPath: 'noteAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Notes'],
    endpoints: (build) => ({
        createNote: build.mutation<INoteCreateData, INoteCreateData>({
            query: (note) => ({
                url: `/places/notes`,
                method: 'POST',
                body: note,
            }),
            invalidatesTags: [{ type: 'Notes', id: 'LIST' }],
        }),
    }),
});
