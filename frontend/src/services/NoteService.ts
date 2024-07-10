import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '#services/baseQuery';
import { INote } from '#interfaces/INote';
import { IPublicityStatus } from '#interfaces/IPublicityStatus';
import { IPlace, IPlaceStats } from '#interfaces/IPlace';
import { IResponseData } from '#interfaces/IResponseData';
import { PAGE_SIZE } from '#utils/consts';
import {
    CreateNoteArgs,
    CreateShortcutArgs,
    FetchArgs,
    FetchNoteArgs,
    FetchNotesArgs,
    UpdateNoteArgs,
} from '#interfaces/IFetch';

const getParams = (args: FetchNotesArgs): Record<string, any> => {
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
    tagTypes: ['Notes', 'Statuses', 'Places', 'PlaceStats'],
    keepUnusedDataFor: 180,
    refetchOnMountOrArgChange: false,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    endpoints: (build) => ({
        fetchNotes: build.query<INote[], FetchNotesArgs>({
            query: (args) => {
                const params = getParams(args);

                return {
                    url: `/users/${args.nickname}/notes`,
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
                    url: `/users/${args.nickname}/notes/count`,
                    params,
                };
            },
            providesTags: [{ type: 'Notes' }],
        }),
        fetchPublicityStatuses: build.query<IPublicityStatus[], void>({
            query: () => `publicity-statuses`,
            providesTags: ['Statuses'],
        }),
        createNote: build.mutation<INote, CreateNoteArgs>({
            query: ({ nickname, data }) => ({
                url: `users/${nickname}/notes`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [
                { type: 'Notes' },
                { type: 'Notes', id: 'LIST' },
                { type: 'Places', id: 'LIST' },
                { type: 'PlaceStats' },
            ],
        }),
        fetchNote: build.query<INote, FetchNoteArgs>({
            query: ({ nickname, id }) => ({
                url: `users/${nickname}/notes/${id}`,
            }),
            providesTags: (result, error, { id }) => [{ type: 'Notes', id }],
        }),
        fetchPlaces: build.query<IResponseData<IPlace[]>, FetchArgs>({
            query: ({ nickname }) => `/users/${nickname}/places`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({ type: 'Places' as const, id })),
                          { type: 'Places', id: 'LIST' },
                      ]
                    : [{ type: 'Places', id: 'LIST' }],
        }),
        updateNote: build.mutation<INote, UpdateNoteArgs>({
            query: ({ nickname, id, data }) => ({
                url: `users/${nickname}/notes/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Notes', id },
                { type: 'Notes', id: 'LIST' },
            ],
        }),
        deleteNote: build.mutation<void, FetchNoteArgs>({
            query: ({ nickname, id }) => ({
                url: `users/${nickname}/notes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Notes', id },
                { type: 'Notes' },
                { type: 'Notes', id: 'LIST' },
                { type: 'Places', id: 'LIST' },
                { type: 'PlaceStats' },
            ],
        }),
        createShortcut: build.mutation<INote, CreateShortcutArgs>({
            query: ({ nickname, noteId }) => ({
                url: `users/${nickname}/shortcuts`,
                method: 'POST',
                body: { noteId },
            }),
            invalidatesTags: [
                { type: 'Notes' },
                { type: 'Notes', id: 'LIST' },
                { type: 'Places', id: 'LIST' },
                { type: 'PlaceStats' },
            ],
        }),
        deleteShortcut: build.mutation<INote, CreateShortcutArgs>({
            query: ({ nickname, noteId }) => ({
                url: `users/${nickname}/shortcuts`,
                method: 'DELETE',
                body: { noteId },
            }),
            invalidatesTags: [
                { type: 'Notes' },
                { type: 'Notes', id: 'LIST' },
                { type: 'Places', id: 'LIST' },
                { type: 'PlaceStats' },
            ],
        }),
        fetchPlaceStats: build.query<IPlaceStats[], FetchArgs>({
            query: ({ nickname }) => ({ url: `/users/${nickname}/places/stats/types`, method: 'GET' }),
            providesTags: [{ type: 'PlaceStats' }],
        }),
    }),
});
