import express from 'express';
import { IUserController } from '../interfaces/User/IUserController';
import { checkAuth } from '../middleware/checkAuth';
import { checkRole } from '../middleware/checkRole';
import { ADMIN_ROLE } from '../utils/consts';
import { setUpdatedAt } from '../middleware/setUpdatedAt';
import { checkIsOwner } from '../middleware/checkIsOwner';
import { upload } from '../index';
import { checkUserExists } from '../middleware/checkUserExists';

export const userRoutes = (userController: IUserController) => {
    const router = express.Router();

    router.get('/users', checkAuth, checkRole(ADMIN_ROLE), userController.getAll);
    router.get('/users/id/:userId', checkAuth, userController.getById);
    router.get('/users/nickname/:username', checkAuth, userController.getByUserName);
    router.get('/users/current', checkAuth, userController.getByToken);
    router.put(
        '/users/:username',
        checkUserExists(userController.userService),
        upload.fields([{ name: 'avatar', maxCount: 1 }]),
        checkAuth,
        checkIsOwner,
        setUpdatedAt,
        userController.update
    );
    router.delete(
        '/users/:username',
        checkUserExists(userController.userService),
        checkAuth,
        checkIsOwner,
        userController.delete
    );

    return router;
};
