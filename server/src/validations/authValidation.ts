import { body } from 'express-validator';

export const registerValidation = [
    body('nickname', 'Некорректный никнейм: длина должна быть от 5 до 30 символов').isLength({ min: 5, max: 30 }),
    body('email', 'Некорректный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 6 символов').isLength({ min: 6 }),
    body('avatar', 'Неверная ссылка на аватар').optional().isURL(),
];

export const loginValidation = [
    body('email', 'Некорректная почта').isEmail(),
    body('password', 'Некорректный пароль').not().isEmpty(),
];
