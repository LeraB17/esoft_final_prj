import express from 'express';
import { INoteController } from '../interfaces/INoteController';
import { checkAuth } from '../middleware/checkAuth';

export const noteRoutes = (noteController: INoteController) => {
    const router = express.Router();

    // TODO исправить роуты
    router.get('/notes', noteController.getAll);
    router.get('/users/:userId/places/notes', noteController.getAllByUserId);
    router.get('/users/:userId/places/:placeId/notes', noteController.getAllByPlaceId);
    // router.post('/users/:userId/places/notes', noteController.create);
    router.post('/places/notes', checkAuth, noteController.create);
    router.get('/users/:userId/places/:placeId/notes/:noteId', noteController.getById);
    router.put('/users/:userId/places/:placeId/notes/:noteId', noteController.update);
    router.delete('/users/:userId/places/:placeId/notes/:noteId', noteController.delete);

    return router;
};
