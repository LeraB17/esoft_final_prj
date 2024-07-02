import express from 'express';
import { IPlaceController } from '../interfaces/IPlaceController';
import { checkAuth } from '../middleware/checkAuth';
import { checkRole } from '../middleware/checkRole';
import { ADMIN_ROLE } from '../utils/consts';

export const placeRoutes = (placeController: IPlaceController) => {
    const router = express.Router();

    router.get('/users/:username/places', checkAuth, placeController.getAllByUserId);
    router.get('/users/:username/places/:placeId', checkAuth, placeController.getById);
    router.post('/places', checkAuth, checkRole(ADMIN_ROLE), placeController.create);
    router.put('/places/:placeId', checkAuth, checkRole(ADMIN_ROLE), placeController.update);
    router.delete('/places/:placeId', checkAuth, checkRole(ADMIN_ROLE), placeController.delete);

    return router;
};
