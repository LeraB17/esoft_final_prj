import { INote } from '../Note/INote';
import { UserWithoutPassword } from '../User/IUser';
import { IDType } from '../types';

export interface IShortcut {
    id: IDType;
    userId: IDType;
    noteId: IDType;
    user?: UserWithoutPassword;
    note?: INote;
}
