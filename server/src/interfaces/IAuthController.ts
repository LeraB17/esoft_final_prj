import { IAuthService } from './IAuthService';
import { FuncType } from './INoteController';

export interface IAuthController {
    authService: IAuthService;
    refreshTokens: FuncType;
    register: FuncType;
    login: FuncType;
    logout: FuncType;
}
