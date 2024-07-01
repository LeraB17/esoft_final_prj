import { Request, Response, NextFunction } from 'express';
import { GetNotesArgs } from '../interfaces/GetNotesArgs';

export const getSearchParams = (req: Request, res: Response, next: NextFunction) => {
    const { search, labels, place, radius, sort, limit, offset } = req.query;

    let args: GetNotesArgs = {
        sortDate: {
            column: ((sort as string) || '').replace(/-/, ''),
            order: (sort as string).startsWith('-') ? 'desc' : 'asc',
        },
        limit: Math.min(50, parseInt(limit as string, 10) || 1),
        offset: parseInt(offset as string, 10) || 0,
    };

    if (search) {
        args = { ...args, search: search as string };
    }
    if (labels) {
        args = { ...args, labels: (labels as string).split(',') };
    }
    if (place) {
        args = { ...args, placeId: Number(place) };
    }
    if (radius) {
        args = { ...args, radius: Number(radius) };
    }

    console.log('args', args);

    req.body.args = args;
    next();
};
