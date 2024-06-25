import { Request, Response } from 'express';
import { INoteService } from './INoteService';

export type FuncType = (req: Request, res: Response) => void;

export interface INoteController {
    noteService: INoteService;
    getAll: FuncType;
    getAllByUserId: FuncType;
    getTotalCount: FuncType;
    getAllByPlaceId: FuncType;
    getById: FuncType;
    create: FuncType;
    update: FuncType;
    delete: FuncType;
}
