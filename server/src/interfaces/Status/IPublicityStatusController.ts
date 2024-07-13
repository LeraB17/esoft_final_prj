import { FuncType } from '../Note/INoteController';
import { IPublicityStatusService } from './IPublicityStatusService';

export interface IPublicityStatusController {
    publicityStatusService: IPublicityStatusService;
    getAll: FuncType;
    getById: FuncType;
    create: FuncType;
    update: FuncType;
    delete: FuncType;
}
