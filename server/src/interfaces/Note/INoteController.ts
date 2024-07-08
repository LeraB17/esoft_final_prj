import { INoteService } from './INoteService';
import { FuncType } from '../types';
import { IUserService } from '../User/IUserService';

export interface INoteController {
    noteService: INoteService;
    userService: IUserService;
    getAll: FuncType;
    getAllByUserId: FuncType;
    getTotalCount: FuncType;
    getById: FuncType;
    create: FuncType;
    update: FuncType;
    delete: FuncType;
}
