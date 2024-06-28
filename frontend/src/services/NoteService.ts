import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '#services/baseQuery';
import { INote } from '#interfaces/INote';
import { IDType } from '#interfaces/types';
import { IPublicityStatus } from '#interfaces/IPublicityStatus';
import { IPlace } from '#interfaces/IPlace';
import { IResponseData } from '#interfaces/IResponseData';

export type SortType = 1 | -1;

interface FetchNotesArgs {
    sortDate?: SortType;
    labels?: string[];
    search?: string;
    placeId?: IDType;
    limit: number;
    offset: number;
}

interface UpdateNoteParams {
    id: IDType;
    data: FormData;
}

export const noteAPI = createApi({
    reducerPath: 'noteAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Notes', 'Statuses', 'Places'],
    keepUnusedDataFor: 180,
    refetchOnMountOrArgChange: false,
    refetchOnFocus: true,
    refetchOnReconnect: true,
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
        fetchPublicityStatuses: build.query<IPublicityStatus[], void>({
            query: () => `publicity-statuses`,
            providesTags: ['Statuses'],
        }),
        createNote: build.mutation<INote, FormData>({
            query: (note) => ({
                url: `/notes`,
                method: 'POST',
                body: note,
            }),
            invalidatesTags: [
                { type: 'Notes', id: 'LIST' },
                { type: 'Places', id: 'LIST' },
            ],
        }),
        fetchNote: build.query<INote, number>({
            query: (id: number) => ({
                url: `/notes/${id}`,
            }),
            providesTags: (result, error, id) => [{ type: 'Notes', id }],
        }),
        fetchPlaces: build.query<IResponseData<IPlace[]>, void>({
            query: () => `/places`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({ type: 'Places' as const, id })),
                          { type: 'Places', id: 'LIST' },
                      ]
                    : [{ type: 'Places', id: 'LIST' }],
        }),
        updateNote: build.mutation<INote, UpdateNoteParams>({
            query: ({ id, data }) => ({
                url: `notes/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Notes', id },
                { type: 'Notes', id: 'LIST' },
            ],
        }),
        deleteNote: build.mutation<void, number>({
            query: (id: number) => ({
                url: `/notes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Notes', id: 'LIST' }],
        }),
    }),
});
