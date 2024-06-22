import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '#services/baseQuery';
import { INote, INoteCreateData } from '#interfaces/INote';
import { IDType } from '#interfaces/types';

export type SortType = 1 | -1;

interface FetchNotesArgs {
    sortDate?: SortType;
    labels?: string[];
    search?: string;
    placeId?: IDType;
    limit: number;
    offset: number;
}

export const noteAPI = createApi({
    reducerPath: 'noteAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Notes'],
    endpoints: (build) => ({
        fetchNotes: build.query<INote[], FetchNotesArgs>({
            query: ({ sortDate = -1, labels = [], search = '', placeId = undefined, limit = 6, offset = 0 }) => {
                const params: Record<string, any> = {
                    sort: `${sortDate > 0 ? '' : '-'}updated_at`,
                    limit,
                    offset,
                };
                if (labels.length > 0) {
                    params.labels = labels;
                }
                if (search !== '') {
                    params.search = search;
                }
                if (placeId !== undefined) {
                    params.placeId = placeId;
                }

                return {
                    url: `/notes`,
                    params,
                };
            },
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Notes' as const, id })), { type: 'Notes', id: 'LIST' }]
                    : [{ type: 'Notes', id: 'LIST' }],
        }),
        fetchTotalCount: build.query<number, void>({
            query: () => `notes/count`,
            providesTags: ['Notes'],
        }),
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
