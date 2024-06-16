import { IUser, PartialUserData, UserData, UserWithoutPassword } from './IUser';

export interface IUserRepo {
    getAll: () => Promise<UserWithoutPassword[]>;
    getById: (userId: number) => Promise<UserWithoutPassword | undefined>;
    getByEmail: (email: string) => Promise<IUser | undefined>;
    getByNickname: (nickname: string) => Promise<IUser | undefined>;
    create: (data: UserData) => Promise<UserWithoutPassword>;
    update: (userId: number, data: PartialUserData) => Promise<UserWithoutPassword | undefined>;
    delete: (userId: number) => Promise<UserWithoutPassword | undefined>;
}
