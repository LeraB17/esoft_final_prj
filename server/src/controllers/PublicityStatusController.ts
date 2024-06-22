import { Request, Response } from 'express';
import { IPublicityStatusController } from '../interfaces/IPublicityStatusController';
import { IPublicityStatusService } from '../interfaces/IPublicityStatusService';

class PublicityStatusController implements IPublicityStatusController {
    constructor(readonly publicityStatusService: IPublicityStatusService) {}

    getAll = async (req: Request, res: Response) => {
        try {
            const statuses = await this.publicityStatusService.getAll();
            res.status(200).json(statuses);
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
            const status = await this.publicityStatusService.getById(Number(req.params.statusId));
            if (status) {
                res.status(200).json(status);
            } else {
                res.status(404).json({ error: 'PublicityStatus not found' });
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
            const status = await this.publicityStatusService.create(req.body);
            res.status(201).json(status);
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
            const status = await this.publicityStatusService.update(Number(req.params.statusId), req.body);
            if (status) {
                res.status(201).json(status);
            } else {
                res.status(404).json({ error: 'PublicityStatus not found' });
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
            const status = await this.publicityStatusService.delete(Number(req.params.statusId));
            if (status) {
                res.status(200).json(status);
            } else {
                res.status(404).json({ error: 'PublicityStatus not found' });
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

export default PublicityStatusController;
