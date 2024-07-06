import { Request, Response, NextFunction } from 'express';
import { IJwtPayload } from '../interfaces/Token/IJwtPayload';

export const checkIsOwner = (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user as IJwtPayload;

    if (!user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    if (user.nickname !== req.params.username) {
        return res.status(403).json({ error: 'Access forbidden' });
    }

    next();
};
