import { Request, Response } from 'express';
import { INoteService } from '../interfaces/INoteService';
import { INoteController } from '../interfaces/INoteController';

class NoteController implements INoteController {
    constructor(readonly noteService: INoteService) {}

    getAll = async (req: Request, res: Response) => {
        try {
            const notes = await this.noteService.getAll();
            res.status(200).json({
                count: notes.length,
                data: notes,
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
            const { limit, offset } = req.query;

            const limitNumber = parseInt(limit as string, 10) || 1;
            const offsetNumber = parseInt(offset as string, 10) || 0;

            const notes = await this.noteService.getAllByUserId(userId, limitNumber, offsetNumber);

            res.status(200).json(notes);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Unknown error occurred' });
            }
        }
    };

    getTotalCount = async (req: Request, res: Response) => {
        try {
            const userId = req.body.user?.id;
            const countNotes = await this.noteService.getTotalCount(userId);

            res.status(200).json(countNotes);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Unknown error occurred' });
            }
        }
    };

    getAllByPlaceId = async (req: Request, res: Response) => {
        try {
            const notes = await this.noteService.getAllByPlaceId(Number(req.params.userId), Number(req.params.placeId));
            res.status(200).json({
                count: notes.length,
                data: notes,
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
            const note = await this.noteService.getById(
                Number(req.params.userId),
                Number(req.params.placeId),
                Number(req.params.noteId)
            );
            if (note) {
                res.status(200).json(note);
            } else {
                res.status(404).json({ error: 'Note not found' });
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
            const files = req.files;
            const formData = {
                ...req.body,
                publicityStatusId: Number(req.body.publicityStatusId),
                place: JSON.parse(req.body.place),
                labels: JSON.parse(req.body.labels),
            };

            let fileNames;
            if (files && 'images' in files) {
                fileNames = (files?.['images'] as any)?.map((file: any) => `${file.filename}`);
            } else {
                fileNames = [];
            }

            const data = { ...formData, images: fileNames };
            const note = await this.noteService.create(userId, data);

            res.status(201).json(note);
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
            const note = await this.noteService.update(
                Number(req.params.userId),
                Number(req.params.placeId),
                Number(req.params.noteId),
                req.body
            );
            if (note) {
                res.status(201).json(note);
            } else {
                res.status(404).json({ error: 'Note not found' });
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
            const note = await this.noteService.delete(
                Number(req.params.userId),
                Number(req.params.placeId),
                Number(req.params.noteId)
            );
            if (note) {
                res.status(200).json(note);
            } else {
                res.status(404).json({ error: 'Note not found' });
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

export default NoteController;
