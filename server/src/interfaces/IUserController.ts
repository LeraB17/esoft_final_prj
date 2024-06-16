import { FuncType } from './INoteController';
import { IUserService } from './IUserService';

export interface IUserController {
    userService: IUserService;
    getAll: FuncType;
    getById: FuncType;
    getByToken: FuncType;
    register: FuncType;
    login: FuncType;
    logout: FuncType;
    update: FuncType;
    delete: FuncType;
}
