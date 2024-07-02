import { SECRET_KEY, REFRESH_SESSION_DURATION_DAYS, SESSION_DURATION } from '../config/config';
import { IJwtPayload } from '../interfaces/IJwtPayload';
import { ITokenRepo } from '../interfaces/ITokenRepo';
import { IUser, PartialUserData, UserAuthData, UserData, UserWithoutPassword } from '../interfaces/IUser';
import { IUserRepo } from '../interfaces/IUserRepo';
import { IUserService } from '../interfaces/IUserService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IDType } from '../interfaces/types';

class UserService implements IUserService {
    constructor(readonly userRepo: IUserRepo, readonly tokenRepo: ITokenRepo) {}

    getAll = async (): Promise<UserWithoutPassword[]> => {
        return this.userRepo.getAll();
    };

    getById = async (userId: IDType): Promise<UserWithoutPassword | undefined> => {
        return this.userRepo.getById(userId);
    };

    getByNickName = async (nickname: string): Promise<UserWithoutPassword | undefined> => {
        return this.userRepo.getByNickname(nickname);
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

    generateTokens = (user: IUser | UserWithoutPassword) => {
        const payload: IJwtPayload = { id: user.id, nickname: user.nickname, role: user.role };
        const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: SESSION_DURATION });
        const refreshToken = jwt.sign(payload, SECRET_KEY, { expiresIn: `${REFRESH_SESSION_DURATION_DAYS}d` });

        return { accessToken, refreshToken };
    };

    getExpiresAt = () => {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + Number(REFRESH_SESSION_DURATION_DAYS));
        return expiresAt;
    };

    login = async (data: UserAuthData, fingerprint: string): Promise<UserWithoutPassword | undefined> => {
        const user = await this.userRepo.getByEmail(data.email);

        if (user && (await bcrypt.compare(data.password, user.password))) {
            const tokens = this.generateTokens(user);
            const userData = { ...user, tokens };

            await this.tokenRepo.save(user.id, tokens.refreshToken, fingerprint, this.getExpiresAt());

            return userData;
        }

        return undefined;
    };

    refreshToken = async (refreshToken: string, fingerprint: string) => {
        try {
            const decoded = jwt.verify(refreshToken, SECRET_KEY) as IJwtPayload;

            const user = await this.userRepo.getById(decoded?.id);
            if (!user) {
                throw new Error();
            }
            const savedRefreshToken = await this.tokenRepo.getByTokenData(user.id, refreshToken, fingerprint);
            if (!savedRefreshToken) {
                throw new Error();
            }
            const tokens = this.generateTokens(user);
            await this.tokenRepo.save(user.id, tokens.refreshToken, fingerprint, this.getExpiresAt());

            return tokens;
        } catch (error) {
            console.log(error);
            throw new Error('Invalid refresh token');
        }
    };

    logout = async (userId: IDType, refreshToken: string) => {
        await this.tokenRepo.delete(userId, refreshToken);
    };

    update = async (userId: IDType, data: PartialUserData): Promise<UserWithoutPassword | undefined> => {
        return this.userRepo.update(userId, data);
    };

    delete = async (userId: IDType): Promise<UserWithoutPassword | undefined> => {
        return this.userRepo.delete(userId);
    };
}

export default UserService;
