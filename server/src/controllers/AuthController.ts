import { Request, Response } from 'express';
import { REFRESH_SESSION_DURATION_DAYS } from '../config/config';
import { IAuthController } from '../interfaces/IAuthController';
import { IAuthService } from '../interfaces/IAuthService';

class AuthController implements IAuthController {
    constructor(readonly authService: IAuthService) {}

    register = async (req: Request, res: Response) => {
        try {
            const user = await this.authService.register(req.body);
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
            const fingerprint = `meow`;

            const user = await this.authService.login(req.body, fingerprint);

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            res.cookie('refreshToken', user.tokens?.refreshToken, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: Number(REFRESH_SESSION_DURATION_DAYS) * 24 * 60 * 60 * 1000,
            });

            return res.status(200).json({ message: 'Authenticated', tokens: user.tokens });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Unknown error occurred' });
            }
        }
    };

    refreshTokens = async (req: Request, res: Response) => {
        const fingerprint = `meow`;
        const refreshToken = req.cookies.refreshToken;

        try {
            const tokens = await this.authService.refreshToken(refreshToken, fingerprint);

            res.cookie('refreshToken', tokens?.refreshToken, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: Number(REFRESH_SESSION_DURATION_DAYS) * 24 * 60 * 60 * 1000,
            });

            return res.status(200).json(tokens);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Unknown error occurred' });
            }
        }
    };

    logout = async (req: Request, res: Response) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            const userId = req.body.user?.id;

            await this.authService.logout(userId, refreshToken);

            res.clearCookie('refreshToken');
            res.json({ message: 'Successfully logged out' });
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
            res.status(500).json({ message: 'Failed to logout' });
        }
    };
}

export default AuthController;
