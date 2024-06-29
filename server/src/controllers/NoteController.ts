import { Request, Response } from 'express';
import { INoteService } from '../interfaces/INoteService';
import { INoteController } from '../interfaces/INoteController';
import { GetNotesArgs } from '../interfaces/GetNotesArgs';

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
            const { sort, labels, search, placeId, limit, offset } = req.query;

            let args: GetNotesArgs = {
                sortDate: {
                    column: ((sort as string) || '').replace(/-/, ''),
                    order: (sort as string).startsWith('-') ? 'desc' : 'asc',
                },
                limit: parseInt(limit as string, 10) || 1,
                offset: parseInt(offset as string, 10) || 0,
            };

            if (labels) {
                args = { ...args, labels: (labels as string).split(',') };
            }
            if (search) {
                args = { ...args, search: search as string };
            }
            if (placeId) {
                args = { ...args, placeId: Number(placeId) };
            }

            const notes = await this.noteService.getAllByUserId(userId, args);

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

    getById = async (req: Request, res: Response) => {
        try {
            const userId = req.body.user?.id;
            const noteId = req.params.noteId;

            const note = await this.noteService.getById(userId, Number(noteId));
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
            const userId = req.body.user?.id;
            const noteId = req.params.noteId;
            const files = req.files;

            let formData = {
                ...req.body,
                labels: JSON.parse(req.body.labels),
            };

            if (req.body.publicityStatusId) {
                formData = {
                    ...formData,
                    publicityStatusId: Number(req.body.publicityStatusId),
                };
            }

            if (req.body.place) {
                formData = {
                    ...formData,
                    place: JSON.parse(req.body.place),
                };
            }

            if (req.body.oldImages) {
                formData = {
                    ...formData,
                    oldImages: JSON.parse(req.body.oldImages),
                };
            }

            let fileNames;
            if (files && 'images' in files) {
                fileNames = (files?.['images'] as any)?.map((file: any) => `${file.filename}`);
            } else {
                fileNames = [];
            }

            const updateData = { ...formData, images: fileNames };

            console.log('updateData', updateData);

            const note = await this.noteService.update(userId, Number(noteId), updateData);
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
            const userId = req.body.user?.id;
            const noteId = req.params.noteId;

            const note = await this.noteService.delete(userId, Number(noteId));
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
