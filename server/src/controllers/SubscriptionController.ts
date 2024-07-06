import { Request, Response } from 'express';
import { ISubscriptionController } from '../interfaces/Subscription/ISubscriptionController';
import { ISubscriptionService } from '../interfaces/Subscription/ISubscriptionService';
import { IUserService } from '../interfaces/User/IUserService';

class SubscriptionController implements ISubscriptionController {
    constructor(readonly subscriptionService: ISubscriptionService, readonly userService: IUserService) {}

    getSubscriptionsByUserId = async (req: Request, res: Response) => {
        try {
            const userName = req.params.username;

            const user = await this.userService.getByNickName(userName);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const subscriptions = await this.subscriptionService.getSubscriptionsByUserId(user.id);
            res.status(200).json(subscriptions);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Unknown error occurred' });
            }
        }
    };

    getSubscribersByUserId = async (req: Request, res: Response) => {
        try {
            const userName = req.params.username;

            const user = await this.userService.getByNickName(userName);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const subscriptions = await this.subscriptionService.getSubscribersByUserId(user.id);
            res.status(200).json(subscriptions);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Unknown error occurred' });
            }
        }
    };

    create = async (req: Request, res: Response) => {
        try {
            const userName = req.params.username;
            const targetUserName = req.body.targetUserName;

            const user = await this.userService.getByNickName(userName);
            const targetUser = await this.userService.getByNickName(targetUserName);

            if (!user || !targetUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            const subscription = await this.subscriptionService.getOne(user.id, targetUser.id);
            if (subscription) {
                return res.status(400).send({ message: 'Already subscribed' });
            }

            await this.subscriptionService.create(user.id, targetUser.id);
            res.status(201).json({ message: 'Subscribed successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Unknown error occurred' });
            }
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const userName = req.params.username;
            const targetUserName = req.body.targetUserName;

            const user = await this.userService.getByNickName(userName);
            const targetUser = await this.userService.getByNickName(targetUserName);

            if (!user || !targetUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            const subscription = await this.subscriptionService.delete(user.id, targetUser.id);
            if (subscription) {
                return res.status(200).json({ message: 'Unsubscribed successfully' });
            }
            return res.status(404).json({ message: 'Not subscribed' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Unknown error occurred' });
            }
        }
    };
}

export default SubscriptionController;
