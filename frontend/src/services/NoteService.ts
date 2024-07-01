import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '#services/baseQuery';
import { INote } from '#interfaces/INote';
import { IDType } from '#interfaces/types';
import { IPublicityStatus } from '#interfaces/IPublicityStatus';
import { IPlace } from '#interfaces/IPlace';
import { IResponseData } from '#interfaces/IResponseData';
import { PAGE_SIZE } from '#utils/consts';

export type SortType = 1 | -1;

export interface FetchNotesArgs {
    search?: string;
    labels?: number[];
    place?: IDType;
    radius?: number;
    sort?: SortType;
    limit?: number;
    offset?: number;
}

interface UpdateNoteParams {
    id: IDType;
    data: FormData;
}

const getParams = (args: FetchNotesArgs): Record<string, any> => {
    console.log('args', args.sort);
    const params: Record<string, any> = {
        sort: `${(args.sort || -1) > 0 ? '' : '-'}createdAt`,
        limit: args.limit || PAGE_SIZE,
        offset: args.offset || 0,
    };
    if (args.search) {
        params.search = args.search;
    }
    if (args.labels && args.labels.length > 0) {
        params.labels = args.labels;
    }
    if (args.place) {
        params.place = args.place;
    }
    if (args.radius) {
        params.radius = args.radius;
    }

    return params;
};

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
            query: (args) => {
                const params = getParams(args);

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
        fetchTotalCount: build.query<number, FetchNotesArgs>({
            query: (args) => {
                const params = getParams(args);

                return {
                    url: `notes/count`,
                    params,
                };
            },
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
            invalidatesTags: (result, error, id) => [
                { type: 'Notes', id },
                { type: 'Notes', id: 'LIST' },
            ],
        }),
    }),
});
