import express from 'express';
import { checkAuth } from '../middleware/checkAuth';
import { checkIsOwner } from '../middleware/checkIsOwner';
import { IShortcutController } from '../interfaces/Shortcut/IShortcutController';

export const shortcutRoutes = (shortcutController: IShortcutController) => {
    const router = express.Router();

    router.post('/users/:username/shortcuts', checkAuth, checkIsOwner, shortcutController.create);
    router.delete('/users/:username/shortcuts', checkAuth, checkIsOwner, shortcutController.delete);

    return router;
};
