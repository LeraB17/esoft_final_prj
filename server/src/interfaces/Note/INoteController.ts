import { INoteService } from './INoteService';
import { FuncType } from '../types';

export interface INoteController {
    noteService: INoteService;
    getAll: FuncType;
    getAllByUserId: FuncType;
    getTotalCount: FuncType;
    getById: FuncType;
    create: FuncType;
    update: FuncType;
    delete: FuncType;
}
