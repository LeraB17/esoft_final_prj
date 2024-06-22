import express from 'express';
import { checkAuth } from '../middleware/checkAuth';
import { IPublicityStatusController } from '../interfaces/IPublicityStatusController';
import { checkRole } from '../middleware/checkRole';
import { ADMIN_ROLE } from '../utils/consts';

export const publicityStatusRoutes = (publicityStatusController: IPublicityStatusController) => {
    const router = express.Router();

    router.get('/publicity-statuses', checkAuth, publicityStatusController.getAll);
    router.get('/publicity-statuses/:statusId', checkAuth, publicityStatusController.getById);
    router.post('/publicity-statuses', checkAuth, checkRole(ADMIN_ROLE), publicityStatusController.create);
    router.put('/publicity-statuses/:statusId', checkAuth, checkRole(ADMIN_ROLE), publicityStatusController.update);
    router.delete('/publicity-statuses/:statusId', checkAuth, checkRole(ADMIN_ROLE), publicityStatusController.delete);

    return router;
};
