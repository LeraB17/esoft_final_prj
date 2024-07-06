import { FuncType } from '../types';
import { ILabelService } from './ILabelService';

export interface ILabelController {
    labelService: ILabelService;
    getAll: FuncType;
    getAllForUser: FuncType;
    getByNoteId: FuncType;
    getById: FuncType;
    create: FuncType;
    update: FuncType;
    delete: FuncType;
}
