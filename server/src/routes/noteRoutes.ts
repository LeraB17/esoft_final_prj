import express from 'express';
import { INoteController } from '../interfaces/INoteController';
import { checkAuth } from '../middleware/checkAuth';
import { upload } from '../index';
import { setUpdatedAt } from '../middleware/setUpdatedAt';
import { getSearchParams } from '../middleware/getSearchParams';

export const noteRoutes = (noteController: INoteController) => {
    const router = express.Router();

    router.get('/notes', checkAuth, getSearchParams, noteController.getAllByUserId);
    router.get('/notes/count', checkAuth, getSearchParams, noteController.getTotalCount);
    router.post('/notes', upload.fields([{ name: 'images', maxCount: 5 }]), checkAuth, noteController.create);
    router.get('/notes/:noteId', checkAuth, noteController.getById);
    router.put(
        '/notes/:noteId',
        upload.fields([{ name: 'images', maxCount: 5 }]),
        checkAuth,
        setUpdatedAt,
        noteController.update
    );
    router.delete('/notes/:noteId', checkAuth, noteController.delete);

    return router;
};
