import { Request, Response, NextFunction } from 'express';
import { IUserService } from '../interfaces/User/IUserService';

export const checkUserExists = (userService: IUserService) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const username = req.params.username;

        try {
            const user = await userService.getByNickName(username);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.locals.userFromParams = user;
            next();
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };
};
