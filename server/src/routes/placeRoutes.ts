import express from 'express';
import PlaceController from '../controllers/PlaceController';

export const placeRoutes = (placeController: PlaceController) => {
    const router = express.Router();

    router.get('/places', placeController.getAll);
    router.get('/users/:userId/places', placeController.getAllByUserId);
    router.get('/users/:userId/places/:placeId', placeController.getById);
    router.post('/users/:userId/places', placeController.create);
    router.put('/users/:userId/places/:placeId', placeController.update);
    router.delete('/users/:userId/places/:placeId', placeController.delete);

    return router;
};
