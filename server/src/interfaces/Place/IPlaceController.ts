import { IUserService } from '../User/IUserService';
import { FuncType } from '../types';
import { IPlaceService } from './IPlaceService';

export interface IPlaceController {
    placeService: IPlaceService;
    userService: IUserService;
    getAll: FuncType;
    getAllByUserId: FuncType;
    getById: FuncType;
    create: FuncType;
    update: FuncType;
    delete: FuncType;
}
