import { ILabelService } from './ILabelService';
import { FuncType } from './INoteController';

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
