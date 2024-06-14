import { Request, Response } from 'express';
import { IPlaceController } from '../interfaces/IPlaceController';
import { IPlaceService } from '../interfaces/IPlaceService';
import { FuncType } from '../interfaces/INoteController';

class PlaceController implements IPlaceController {
    constructor(readonly placeService: IPlaceService) {}

    getAll = async (req: Request, res: Response) => {
        try {
            const places = await this.placeService.getAll();
            res.status(200).json({
                count: places.length,
                data: places,
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Unknown error occurred' });
            }
        }
    };

    getAllByUserId = async (req: Request, res: Response) => {
        try {
            const places = await this.placeService.getAllByUserId(Number(req.params.userId));
            res.status(200).json({
                count: places.length,
                data: places,
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Unknown error occurred' });
            }
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
            const place = await this.placeService.getById(Number(req.params.userId), Number(req.params.placeId));
            if (place) {
                res.status(200).json(place);
            } else {
                res.status(404).json({ error: 'Place not found' });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Unknown error occurred' });
            }
        }
    };

    create = async (req: Request, res: Response) => {
        try {
            const place = await this.placeService.create(Number(req.params.userId), req.body);
            res.status(201).json(place);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Unknown error occurred' });
            }
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const place = await this.placeService.update(Number(req.params.userId), Number(req.params.placeId), req.body);
            if (place) {
                res.status(201).json(place);
            } else {
                res.status(404).json({ error: 'Place not found' });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Unknown error occurred' });
            }
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const note = await this.placeService.delete(Number(req.params.userId), Number(req.params.placeId));
            if (note) {
                res.status(200).json(note);
            } else {
                res.status(404).json({ error: 'Place not found' });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Unknown error occurred' });
            }
        }
    };
}

export default PlaceController;
