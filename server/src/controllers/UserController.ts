import { Request, Response } from 'express';
import { IUserController } from '../interfaces/User/IUserController';
import { IUserService } from '../interfaces/User/IUserService';

class UserController implements IUserController {
    constructor(readonly userService: IUserService) {}

    getAll = async (req: Request, res: Response) => {
        try {
            const users = await this.userService.getAll();
            res.status(200).json({
                count: users.length,
                data: users,
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Unknown error occurred' });
            }
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.getById(Number(req.params.userId));
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Unknown error occurred' });
            }
        }
    };

    getByUserName = async (req: Request, res: Response) => {
        try {
            const userId = Number(req.body.user?.id);
            const user = await this.userService.getByNickName(req.params.username, userId);

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Unknown error occurred' });
            }
        }
    };

    getByToken = async (req: Request, res: Response) => {
        try {
            const userId = Number(req.body.user?.id);
            const user = await this.userService.getById(userId);

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Unknown error occurred' });
            }
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const userId = Number(req.body.user?.id);
            const files = req.files;

            const { user, ...formData } = req.body;

            let fileName;
            if (files && 'avatar' in files) {
                fileName = (files?.['avatar'] as any)[0].filename;
            } else {
                fileName = '';
            }

            const updateData = { ...formData, avatar: fileName };

            const updatedUser = await this.userService.update(userId, updateData);
            if (updatedUser) {
                res.status(201).json({ user: updatedUser });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
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
            const userId = Number(req.body.user?.id);

            const user = await this.userService.delete(userId, req.body);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Unknown error occurred' });
            }
        }
    };
}

export default UserController;
