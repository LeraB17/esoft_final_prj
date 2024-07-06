import express from 'express';
import { INoteController } from '../interfaces/Note/INoteController';
import { checkAuth } from '../middleware/checkAuth';
import { upload } from '../index';
import { setUpdatedAt } from '../middleware/setUpdatedAt';
import { getSearchParams } from '../middleware/getSearchParams';
import { checkIsOwner } from '../middleware/checkIsOwner';

export const noteRoutes = (noteController: INoteController) => {
    const router = express.Router();

    router.get('/users/:username/notes', checkAuth, getSearchParams, noteController.getAllByUserId);
    router.get('/users/:username/notes/count', checkAuth, getSearchParams, noteController.getTotalCount);
    router.post(
        '/users/:username/notes',
        upload.fields([{ name: 'images', maxCount: 5 }]),
        checkAuth,
        checkIsOwner,
        noteController.create
    );
    router.get('/users/:username/notes/:noteId', checkAuth, noteController.getById);
    router.put(
        '/users/:username/notes/:noteId',
        upload.fields([{ name: 'images', maxCount: 5 }]),
        checkAuth,
        checkIsOwner,
        setUpdatedAt,
        noteController.update
    );
    router.delete('/users/:username/notes/:noteId', checkAuth, checkIsOwner, noteController.delete);

    return router;
};
