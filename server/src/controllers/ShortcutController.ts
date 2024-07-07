import { Request, Response } from 'express';
import { IShortcutController } from '../interfaces/Shortcut/IShortcutController';
import { IShortcutService } from '../interfaces/Shortcut/IShortcutService';

class ShortcutController implements IShortcutController {
    constructor(readonly shortcutService: IShortcutService) {}

    // getAllByUserId = async (req: Request, res: Response) => {
    //     try {
    //         const userId = req.body.user?.id;
    //         const args = req.body.args;
    //         const targetUserName = req.params.username;

    //         const targetUser = await this.userService.getByNickName(targetUserName);

    //         if (!targetUser) {
    //             return res.status(404).json({ message: 'User not found' });
    //         }

    //         const notes = await this.shortcutService.getAllByUserId(userId, targetUser.id, args);

    //         res.status(200).json(notes);
    //     } catch (error: unknown) {
    //         if (error instanceof Error) {
    //             res.status(500).json({ error: error.message });
    //         } else {
    //             res.status(500).json({ error: 'Unknown error occurred' });
    //         }
    //     }
    // };

    // getTotalCount = async (req: Request, res: Response) => {
    //     try {
    //         const userId = req.body.user?.id;
    //         const args = req.body.args;
    //         const targetUserName = req.params.username;

    //         const targetUser = await this.userService.getByNickName(targetUserName);

    //         if (!targetUser) {
    //             return res.status(404).json({ message: 'User not found' });
    //         }

    //         const countNotes = await this.shortcutService.getTotalCount(userId, targetUser.id, args);

    //         res.status(200).json(countNotes);
    //     } catch (error: unknown) {
    //         if (error instanceof Error) {
    //             res.status(500).json({ error: error.message });
    //         } else {
    //             res.status(500).json({ error: 'Unknown error occurred' });
    //         }
    //     }
    // };

    create = async (req: Request, res: Response) => {
        try {
            const userId = req.body.user?.id;
            const noteId = Number(req.body.noteId);

            const note = await this.shortcutService.create(userId, noteId);

            res.status(201).json(note);
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
            const noteId = Number(req.body.noteId);

            const shortcut = await this.shortcutService.delete(userId, noteId);
            if (shortcut) {
                res.status(200).json(shortcut);
            } else {
                res.status(404).json({ error: 'Shortcut not found' });
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

export default ShortcutController;
