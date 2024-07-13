import { Request, Response, NextFunction } from 'express';
import { GetNotesArgs } from '../interfaces/GetNotesArgs';

export const getSearchParams = (req: Request, res: Response, next: NextFunction) => {
    const { search, labels, place, center, radius, type, sort, limit, offset } = req.query;

    let args: GetNotesArgs = {
        sortDate: {
            column: ((sort as string) || '').replace(/-/, ''),
            order: ((sort as string) || '').startsWith('-') ? 'desc' : 'asc',
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
    if (center && radius) {
        args = { ...args, radius: Number(radius) };

        const temp = (center as string).split(',');
        args = { ...args, center: [Number(temp[0]), Number(temp[1])] };
    }
    if (type) {
        args = { ...args, type: type as string };
    }

    console.log('args', args);

    res.locals.args = args;
    next();
};
