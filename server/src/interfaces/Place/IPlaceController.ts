import { FuncType } from '../Note/INoteController';
import { IPlaceService } from './IPlaceService';

export interface IPlaceController {
    placeService: IPlaceService;
    getAll: FuncType;
    getAllByUserId: FuncType;
    getById: FuncType;
    create: FuncType;
    update: FuncType;
    delete: FuncType;
}
