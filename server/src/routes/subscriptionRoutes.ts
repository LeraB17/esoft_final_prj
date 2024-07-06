import express from 'express';
import { checkAuth } from '../middleware/checkAuth';
import { checkIsOwner } from '../middleware/checkIsOwner';
import { ISubscriptionController } from '../interfaces/ISubscriptionController';

export const subscriptionRoutes = (subscriptionController: ISubscriptionController) => {
    const router = express.Router();

    router.get('/users/:username/subscriptions', checkAuth, subscriptionController.getSubscriptionsByUserId);
    router.get('/users/:username/subscribers', checkAuth, subscriptionController.getSubscribersByUserId);
    router.post('/users/:username/subscribe', checkAuth, checkIsOwner, subscriptionController.create);
    router.delete('/users/:username/unsubscribe', checkAuth, checkIsOwner, subscriptionController.delete);

    return router;
};
