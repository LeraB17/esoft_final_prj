import express from 'express';
import { IPlaceController } from '../interfaces/IPlaceController';
import { checkAuth } from '../middleware/checkAuth';
import { checkRole } from '../middleware/checkRole';
import { ADMIN_ROLE } from '../utils/consts';

export const placeRoutes = (placeController: IPlaceController) => {
    const router = express.Router();

    // TODO исправить роуты

    router.get('/places', checkAuth, checkRole(ADMIN_ROLE), placeController.getAll);
    router.get('/users/:userId/places', placeController.getAllByUserId);
    router.get('/users/:userId/places/:placeId', placeController.getById);
    router.post('/users/:userId/places', checkAuth, checkRole(ADMIN_ROLE), placeController.create);
    router.put('/users/:userId/places/:placeId', checkAuth, checkRole(ADMIN_ROLE), placeController.update);
    router.delete('/users/:userId/places/:placeId', checkAuth, checkRole(ADMIN_ROLE), placeController.delete);

    return router;
};
