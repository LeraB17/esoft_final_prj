import { IDType } from './types';

export type SortType = 1 | -1;

export interface FetchArgs {
    nickname: string;
}
export interface FetchNotesArgs extends FetchArgs {
    search?: string;
    labels?: number[];
    place?: IDType;
    radius?: number;
    sort?: SortType;
    limit?: number;
    offset?: number;
}

export interface CreateNoteArgs extends FetchArgs {
    data: FormData;
}

export interface UpdateNoteArgs extends FetchArgs {
    id: IDType;
    data: FormData;
}

export interface FetchNoteArgs extends FetchArgs {
    id: IDType;
}

export interface CreateShortcutArgs extends FetchArgs {
    noteId: IDType;
}

export interface UpdateUserArgs extends FetchArgs {
    data: FormData;
}

export interface DeleteUserArgs extends FetchArgs {
    password: string;
}
