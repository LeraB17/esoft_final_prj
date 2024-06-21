import { Request, Response } from 'express';
import { ILabelController } from '../interfaces/ILabelController';
import { ILabelService } from '../interfaces/ILabelService';

class LabelController implements ILabelController {
    constructor(readonly labelService: ILabelService) {}

    getAll = async (req: Request, res: Response) => {
        try {
            const labels = await this.labelService.getAll();
            res.status(200).json({
                count: labels.length,
                data: labels,
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Unknown error occurred' });
            }
        }
    };

    getAllForUser = async (req: Request, res: Response) => {
        try {
            const userId = req.body.user?.id;
            const labels = await this.labelService.getAllForUser(userId);
            res.status(200).json({
                count: labels.length,
                data: labels,
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Unknown error occurred' });
            }
        }
    };

    getByNoteId = async (req: Request, res: Response) => {
        try {
            const labels = await this.labelService.getByNoteId(Number(req.params.noteId));
            res.status(200).json({
                count: labels.length,
                data: labels,
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
            const label = await this.labelService.getById(Number(req.params.labelId));
            if (label) {
                res.status(200).json(label);
            } else {
                res.status(404).json({ error: 'Label not found' });
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
            const label = await this.labelService.create(Number(req.params.userId), req.body);
            res.status(201).json(label);
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
            const label = await this.labelService.update(Number(req.params.userId), Number(req.params.labelId), req.body);
            if (label) {
                res.status(201).json(label);
            } else {
                res.status(404).json({ error: 'Label not found' });
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
            const label = await this.labelService.delete(Number(req.params.userId), Number(req.params.labelId));
            if (label) {
                res.status(200).json(label);
            } else {
                res.status(404).json({ error: 'Label not found' });
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

export default LabelController;
