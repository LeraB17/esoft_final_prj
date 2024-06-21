import { IUser, PartialUserData, UserData, UserWithoutPassword } from './IUser';
import { IDType } from './types';

export interface IUserRepo {
    getAll: () => Promise<UserWithoutPassword[]>;
    getById: (userId: IDType) => Promise<UserWithoutPassword | undefined>;
    getByEmail: (email: string) => Promise<IUser | undefined>;
    getByNickname: (nickname: string) => Promise<IUser | undefined>;
    create: (data: UserData) => Promise<UserWithoutPassword>;
    update: (userId: IDType, data: PartialUserData) => Promise<UserWithoutPassword | undefined>;
    delete: (userId: IDType) => Promise<UserWithoutPassword | undefined>;
}
