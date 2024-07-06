import { FuncType } from './INoteController';
import { IUserService } from './IUserService';

export interface IUserController {
    userService: IUserService;
    getAll: FuncType;
    getById: FuncType;
    getByUserName: FuncType;
    getByToken: FuncType;
    update: FuncType;
    delete: FuncType;
}
