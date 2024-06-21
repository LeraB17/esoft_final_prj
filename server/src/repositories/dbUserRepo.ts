import db from '../db/db';
import { IUser, PartialUserData, UserData, UserWithoutPassword } from '../interfaces/IUser';
import { IUserRepo } from '../interfaces/IUserRepo';
import { IDType } from '../interfaces/types';
import { USER_ROLE } from '../utils/consts';

class DbUserRepo implements IUserRepo {
    constructor() {}

    getAll = async (): Promise<UserWithoutPassword[]> => {
        try {
            const users = await db('users')
                .select(
                    'users.id',
                    'users.nickname',
                    'users.email',
                    'users.avatar',
                    'users.createdAt',
                    'users.updatedAt',
                    'roles.name as role'
                )
                .leftJoin('roles', 'users.roleId', 'roles.id');

            return users;
        } catch (error) {
            console.error('Error users getAll:', error);
            throw new Error('Database error');
        }
    };

    getById = async (userId: IDType): Promise<UserWithoutPassword | undefined> => {
        try {
            const user = await db('users')
                .select(
                    'users.id',
                    'users.nickname',
                    'users.email',
                    'users.avatar',
                    'users.createdAt',
                    'users.updatedAt',
                    'roles.name as role'
                )
                .leftJoin('roles', 'users.roleId', 'roles.id')
                .where('users.id', userId)
                .first();

            return user;
        } catch (error) {
            console.error('Error users getById:', error);
            throw new Error('Database error');
        }
    };

    getByNickname = async (nickname: string): Promise<IUser | undefined> => {
        try {
            const user = await db('users')
                .select(
                    'users.id',
                    'users.nickname',
                    'users.email',
                    'users.avatar',
                    'users.createdAt',
                    'users.updatedAt',
                    'roles.name as role'
                )
                .leftJoin('roles', 'users.roleId', 'roles.id')
                .where('nickname', nickname)
                .first();

            return user;
        } catch (error) {
            console.error('Error users getByNickname:', error);
            throw new Error('Database error');
        }
    };

    getByEmail = async (email: string): Promise<IUser | undefined> => {
        try {
            const user = await db('users')
                .select(
                    'users.id',
                    'users.nickname',
                    'users.email',
                    'users.password',
                    'users.avatar',
                    'users.createdAt',
                    'users.updatedAt',
                    'roles.name as role'
                )
                .leftJoin('roles', 'users.roleId', 'roles.id')
                .where('email', email)
                .first();

            return user;
        } catch (error) {
            console.error('Error users getByEmail:', error);
            throw new Error('Database error');
        }
    };

    create = async (data: UserData): Promise<UserWithoutPassword> => {
        try {
            const role = await db('roles').select('*').where('name', USER_ROLE).first();

            const [newUser] = await db('users')
                .insert({
                    nickname: data.nickname,
                    email: data.email,
                    password: data.password,
                    roleId: role?.id,
                    avatar: data.avatar,
                })
                .returning('*');

            const { password, ...user } = newUser;

            return user;
        } catch (error) {
            console.error('Error users create:', error);
            throw new Error('Database error');
        }
    };

    update = async (userId: IDType, data: PartialUserData): Promise<UserWithoutPassword | undefined> => {
        try {
            const [updatedUser] = await db('users').where('id', userId).update(data).returning('*');
            const { password, ...user } = updatedUser;

            return user;
        } catch (error) {
            console.error('Error users update:', error);
            throw new Error('Database error');
        }
    };

    delete = async (userId: IDType): Promise<UserWithoutPassword | undefined> => {
        try {
            const [deletedUser] = await db('users').where('id', userId).delete().returning('*');
            const { password, ...user } = deletedUser;

            return user;
        } catch (error) {
            console.error('Error users delete:', error);
            throw new Error('Database error');
        }
    };
}

export default DbUserRepo;
