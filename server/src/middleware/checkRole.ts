import { Request, Response, NextFunction } from 'express';

export const checkRole = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.body.user;

        if (!user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        if (user.role !== requiredRole) {
            return res.status(403).json({ error: 'Access forbidden' });
        }

        next();
    };
};
