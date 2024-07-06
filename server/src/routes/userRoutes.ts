import express from 'express';
import { IUserController } from '../interfaces/IUserController';
import { checkAuth } from '../middleware/checkAuth';
import { checkRole } from '../middleware/checkRole';
import { ADMIN_ROLE } from '../utils/consts';
import { setUpdatedAt } from '../middleware/setUpdatedAt';
import { checkIsOwner } from '../middleware/checkIsOwner';

export const userRoutes = (userController: IUserController) => {
    const router = express.Router();

    router.get('/users', checkAuth, checkRole(ADMIN_ROLE), userController.getAll);
    router.get('/users/id/:userId', checkAuth, userController.getById);
    router.get('/users/nickname/:username', checkAuth, userController.getByUserName);
    router.get('/users/current', checkAuth, userController.getByToken);
    router.put('/users/:userId', checkAuth, checkIsOwner, setUpdatedAt, userController.update);
    router.delete('/users/:userId', checkAuth, checkIsOwner, userController.delete);

    return router;
};
