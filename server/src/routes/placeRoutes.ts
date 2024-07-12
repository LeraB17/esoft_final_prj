import express from 'express';
import { IPlaceController } from '../interfaces/Place/IPlaceController';
import { checkAuth } from '../middleware/checkAuth';
import { checkRole } from '../middleware/checkRole';
import { ADMIN_ROLE } from '../utils/consts';
import { checkUserExists } from '../middleware/checkUserExists';
import { getSearchParams } from '../middleware/getSearchParams';

export const placeRoutes = (placeController: IPlaceController) => {
    const router = express.Router();

    router.get(
        '/users/:username/places',
        checkUserExists(placeController.userService),
        checkAuth,
        getSearchParams,
        placeController.getAllByUserId
    );
    router.get(
        '/users/:username/places/stats/types',
        checkUserExists(placeController.userService),
        checkAuth,
        placeController.getStatsByUserId
    );
    router.get(
        '/users/:username/places/:placeId',
        checkUserExists(placeController.userService),
        checkAuth,
        placeController.getById
    );
    router.post('/places', checkAuth, checkRole(ADMIN_ROLE), placeController.create);
    router.put('/places/:placeId', checkAuth, checkRole(ADMIN_ROLE), placeController.update);
    router.delete('/places/:placeId', checkAuth, checkRole(ADMIN_ROLE), placeController.delete);

    return router;
};
