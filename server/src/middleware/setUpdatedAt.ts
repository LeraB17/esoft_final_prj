import { Request, Response, NextFunction } from 'express';
import db from '../db/db';

export const setUpdatedAt = async (req: Request, res: Response, next: NextFunction) => {
    req.body.updatedAt = db.fn.now();
    next();
};
