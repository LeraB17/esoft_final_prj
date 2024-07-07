import { FuncType } from '../types';
import { IShortcutService } from './IShortcutService';

export interface IShortcutController {
    shortcutService: IShortcutService;
    create: FuncType;
    delete: FuncType;
}
