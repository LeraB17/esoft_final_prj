import express from 'express';
import { IUserController } from '../interfaces/IUserController';
import { loginValidation, registerValidation } from '../validations/authValidation';
import { checkAuth } from '../middleware/checkAuth';
import { checkValidationErrors } from '../middleware/checkValidationErrors';
import { checkRole } from '../middleware/checkRole';
import { ADMIN_ROLE } from '../utils/consts';

export const userRoutes = (userController: IUserController) => {
    const router = express.Router();

    router.get('/users', checkAuth, checkRole(ADMIN_ROLE), userController.getAll);
    router.get('/users/:userId', userController.getById);

    router.post('/auth/register', registerValidation, checkValidationErrors, userController.register);
    router.post('/auth/login', loginValidation, checkValidationErrors, userController.login);
    router.post('/auth/logout', checkAuth, userController.logout);
    router.get('/auth/refresh-tokens', userController.refreshTokens);
    router.get('/auth/current', checkAuth, userController.getByToken);

    router.put('/users/:userId', userController.update);
    router.delete('/users/:userId', userController.delete);

    return router;
};
