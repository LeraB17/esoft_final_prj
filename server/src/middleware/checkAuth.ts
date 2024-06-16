import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/config';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'This session has expired' });
        }

        req.body.user = decoded;
        next();
    });
};
