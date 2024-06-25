import express from 'express';
import multer from 'multer';
import { INoteController } from '../interfaces/INoteController';
import { checkAuth } from '../middleware/checkAuth';
import { upload } from '../index';

export const noteRoutes = (noteController: INoteController) => {
    const router = express.Router();

    // TODO исправить роуты
    router.get('/notes', checkAuth, noteController.getAllByUserId);
    router.get('/notes/count', checkAuth, noteController.getTotalCount);
    router.get('/places/:placeId/notes', checkAuth, noteController.getAllByPlaceId);
    router.post('/places/notes', upload.fields([{ name: 'images', maxCount: 5 }]), checkAuth, noteController.create);
    router.get('/places/:placeId/notes/:noteId', checkAuth, noteController.getById);
    router.put('/places/:placeId/notes/:noteId', checkAuth, noteController.update);
    router.delete('/places/:placeId/notes/:noteId', checkAuth, noteController.delete);

    return router;
};
