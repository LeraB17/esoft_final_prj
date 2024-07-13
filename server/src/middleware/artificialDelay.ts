import { Request, Response, NextFunction } from 'express';

export const artificialDelay = (delay: number) => (req: Request, res: Response, next: NextFunction) => {
    setTimeout(() => next(), delay);
};
