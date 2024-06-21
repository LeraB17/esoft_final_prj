import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const checkValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    }
    next();
};
