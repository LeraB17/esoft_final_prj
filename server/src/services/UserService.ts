import { SECRET_KEY, SESSION_DURATION } from '../config/config';
import { PartialUserData, UserAuthData, UserData, UserWithoutPassword } from '../interfaces/IUser';
import { IUserRepo } from '../interfaces/IUserRepo';
import { IUserService } from '../interfaces/IUserService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService implements IUserService {
    constructor(readonly userRepo: IUserRepo) {}

    getAll = async (): Promise<UserWithoutPassword[]> => {
        return this.userRepo.getAll();
    };

    getById = async (userId: number): Promise<UserWithoutPassword | undefined> => {
        return this.userRepo.getById(userId);
    };

    register = async (data: UserData): Promise<UserWithoutPassword> => {
        const existingEmail = await this.userRepo.getByEmail(data.email);
        if (existingEmail) {
            throw new Error('Аккаунт с данной почтой уже создан');
        }

        const existingNickname = await this.userRepo.getByNickname(data.nickname);
        if (existingNickname) {
            throw new Error('Никнейм уже занят');
        }

        const password = data.password;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const userData = { ...data, password: passwordHash };
        const createdUser = await this.userRepo.create(userData);

        return createdUser;
    };

    login = async (data: UserAuthData): Promise<UserWithoutPassword | undefined> => {
        const user = await this.userRepo.getByEmail(data.email);

        if (user && (await bcrypt.compare(data.password, user.password))) {
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                },
                SECRET_KEY,
                {
                    expiresIn: SESSION_DURATION,
                }
            );

            const userData = { ...user, token };

            return userData;
        }

        return undefined;
    };

    logout = async (): Promise<UserWithoutPassword | undefined> => {
        return undefined;
    };

    update = async (userId: number, data: PartialUserData): Promise<UserWithoutPassword | undefined> => {
        return this.userRepo.update(userId, data);
    };

    delete = async (userId: number): Promise<UserWithoutPassword | undefined> => {
        return this.userRepo.delete(userId);
    };
}

export default UserService;
