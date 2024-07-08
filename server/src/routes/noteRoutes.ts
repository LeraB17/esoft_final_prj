import express from 'express';
import { INoteController } from '../interfaces/Note/INoteController';
import { checkAuth } from '../middleware/checkAuth';
import { upload } from '../index';
import { setUpdatedAt } from '../middleware/setUpdatedAt';
import { getSearchParams } from '../middleware/getSearchParams';
import { checkIsOwner } from '../middleware/checkIsOwner';
import { checkUserExists } from '../middleware/checkUserExists';

export const noteRoutes = (noteController: INoteController) => {
    const router = express.Router();

    router.get(
        '/users/:username/notes',
        checkUserExists(noteController.userService),
        checkAuth,
        getSearchParams,
        noteController.getAllByUserId
    );
    router.get(
        '/users/:username/notes/count',
        checkUserExists(noteController.userService),
        checkAuth,
        getSearchParams,
        noteController.getTotalCount
    );
    router.post(
        '/users/:username/notes',
        checkUserExists(noteController.userService),
        upload.fields([{ name: 'images', maxCount: 5 }]),
        checkAuth,
        checkIsOwner,
        noteController.create
    );
    router.get('/users/:username/notes/:noteId', checkUserExists(noteController.userService), checkAuth, noteController.getById);
    router.put(
        '/users/:username/notes/:noteId',
        checkUserExists(noteController.userService),
        upload.fields([{ name: 'images', maxCount: 5 }]),
        checkAuth,
        checkIsOwner,
        setUpdatedAt,
        noteController.update
    );
    router.delete(
        '/users/:username/notes/:noteId',
        checkUserExists(noteController.userService),
        checkAuth,
        checkIsOwner,
        noteController.delete
    );

    return router;
};
