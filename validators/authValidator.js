
const { body } = require('express-validator');
const User = require('../models/users');


const registerValidator = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Введите имя'),

    body('email')
        .trim()
        .isEmail()
        .withMessage('Введите корректный email')
        .bail()
        .normalizeEmail(),

    body('password')
        .isLength({ min: 9 })
        .withMessage('Пароль должен содержать больше 8 символов')
];


const loginValidator = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Введите корректный email')
        .bail()
        .normalizeEmail()
        .custom(async (email) => {
            const user = await User.findByEmail(email);

            if (!user) {
                throw new Error('Пользователь с таким email не найден');
            }

            return true;
        }),

    body('password')
        .isLength({ min: 9 })
        .withMessage('Пароль должен содержать больше 8 символов')
];

module.exports = {
    registerValidator,
    loginValidator
};
