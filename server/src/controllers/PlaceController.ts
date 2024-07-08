import { Request, Response } from 'express';
import { IPlaceController } from '../interfaces/Place/IPlaceController';
import { IPlaceService } from '../interfaces/Place/IPlaceService';
import { IUserService } from '../interfaces/User/IUserService';

class PlaceController implements IPlaceController {
    constructor(readonly placeService: IPlaceService, readonly userService: IUserService) {}

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
            const userId = req.body.user?.id;
            const targetUser = res.locals.userFromParams;

            const places = await this.placeService.getAllByUserId(userId, targetUser.id);

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
            const userId = req.body.user?.id;
            const place = await this.placeService.getById(userId, Number(req.params.placeId));

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
            const userId = req.body.user?.id;
            const place = await this.placeService.create(userId, req.body);
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
            const userId = req.body.user?.id;
            const place = await this.placeService.update(userId, Number(req.params.placeId), req.body);
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
            const userId = req.body.user?.id;
            const place = await this.placeService.delete(userId, Number(req.params.placeId));
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
}

export default PlaceController;
