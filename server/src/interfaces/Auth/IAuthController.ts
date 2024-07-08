import { FuncType } from '../types';
import { IAuthService } from './IAuthService';

export interface IAuthController {
    authService: IAuthService;
    refreshTokens: FuncType;
    register: FuncType;
    login: FuncType;
    logout: FuncType;
}
