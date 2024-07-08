import express from 'express';
import { checkAuth } from '../middleware/checkAuth';
import { checkIsOwner } from '../middleware/checkIsOwner';
import { ISubscriptionController } from '../interfaces/Subscription/ISubscriptionController';
import { checkUserExists } from '../middleware/checkUserExists';

export const subscriptionRoutes = (subscriptionController: ISubscriptionController) => {
    const router = express.Router();

    router.get(
        '/users/:username/subscriptions',
        checkUserExists(subscriptionController.userService),
        checkAuth,
        subscriptionController.getSubscriptionsByUserId
    );
    router.get(
        '/users/:username/subscribers',
        checkUserExists(subscriptionController.userService),
        checkAuth,
        subscriptionController.getSubscribersByUserId
    );
    router.post(
        '/users/:username/subscriptions',
        checkUserExists(subscriptionController.userService),
        checkAuth,
        checkIsOwner,
        subscriptionController.create
    );
    router.delete(
        '/users/:username/subscriptions',
        checkUserExists(subscriptionController.userService),
        checkAuth,
        checkIsOwner,
        subscriptionController.delete
    );

    return router;
};
