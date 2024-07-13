import express from 'express';
import { loginValidation, registerValidation } from '../validations/authValidation';
import { checkAuth } from '../middleware/checkAuth';
import { checkValidationErrors } from '../middleware/checkValidationErrors';
import { IAuthController } from '../interfaces/Auth/IAuthController';

export const authRoutes = (authController: IAuthController) => {
    const router = express.Router();

    router.post('/auth/register', registerValidation, checkValidationErrors, authController.register);
    router.post('/auth/login', loginValidation, checkValidationErrors, authController.login);
    router.post('/auth/logout', checkAuth, authController.logout);
    router.get('/auth/refresh-tokens', authController.refreshTokens);

    return router;
};
