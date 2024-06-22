import express from 'express';
import { INoteController } from '../interfaces/INoteController';
import { checkAuth } from '../middleware/checkAuth';

export const noteRoutes = (noteController: INoteController) => {
    const router = express.Router();

    // TODO исправить роуты
    // router.get('/notes', noteController.getAll);
    router.get('/notes', checkAuth, noteController.getAllByUserId);
    router.get('/notes/count', checkAuth, noteController.getTotalCount);
    router.get('/places/:placeId/notes', checkAuth, noteController.getAllByPlaceId);
    // router.post('/users/:userId/places/notes', noteController.create);
    router.post('/places/notes', checkAuth, noteController.create);
    router.get('/places/:placeId/notes/:noteId', checkAuth, noteController.getById);
    router.put('/places/:placeId/notes/:noteId', checkAuth, noteController.update);
    router.delete('/places/:placeId/notes/:noteId', checkAuth, noteController.delete);

    return router;
};
