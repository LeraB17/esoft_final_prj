import express from 'express';
import { ILabelController } from '../interfaces/ILabelController';
import { checkAuth } from '../middleware/checkAuth';

export const labelRoutes = (labelController: ILabelController) => {
    const router = express.Router();

    router.get('/labels', checkAuth, labelController.getAllForUser);
    router.get('/notes/:noteId/labels', checkAuth, labelController.getByNoteId);
    router.post('/labels', checkAuth, labelController.create);
    router.get('/notes/:noteId/labels/:labelId', checkAuth, labelController.getById);
    router.put('/notes/:noteId/labels/:labelId', checkAuth, labelController.update);
    router.delete('/notes/:noteId/labels/:labelId', checkAuth, labelController.delete);

    return router;
};
