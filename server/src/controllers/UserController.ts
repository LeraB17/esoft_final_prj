import { Request, Response } from 'express';
import { IUserController } from '../interfaces/IUserController';
import { IUserService } from '../interfaces/IUserService';
import { validationResult } from 'express-validator';

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

    getByToken = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.getById(Number(req.body.user?.id));
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

    register = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.register(req.body);
            res.status(201).json({ message: 'User registered', user: user });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Unknown error occurred' });
            }
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.login(req.body);

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            res.cookie('token', user.token, { httpOnly: true });

            return res.status(200).json({ message: 'Authenticated', token: user.token });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Unknown error occurred' });
            }
        }
    };

    logout = async (req: Request, res: Response) => {};

    update = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.update(Number(req.params.userId), req.body);
            if (user) {
                res.status(201).json(user);
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
            const user = await this.userService.delete(Number(req.params.userId));
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
