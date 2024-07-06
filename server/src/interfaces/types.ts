import { Request, Response } from 'express';

export type IDType = number;

export type FuncType = (req: Request, res: Response) => void;
