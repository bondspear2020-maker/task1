
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/users');


function getErrorsByField(errors) {
    return errors.reduce((result, error) => {
        result[error.path] = error.msg;
        return result;
    }, {});
}


async function register(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render('index', {
                registerErrors: getErrorsByField(errors.array()),
                registerValues: req.body
            });
        }

        const { username, email, password } = req.body;


        const existingUser = await User.findByEmail(email);

        if (existingUser) {
            return res.status(400).render('index', {
                registerErrors: {
                    email: 'Этот email уже зарегистрирован'
                },
                registerValues: req.body
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const userId = await User.create(
            username,
            email,
            passwordHash
        );


        req.session.regenerate((error) => {
            if (error) return next(error);

            req.session.user = {
                id: userId,
                username,
                email
            };

            req.session.save((error) => {
                if (error) return next(error);

                res.redirect('/dashboard');
            });
        });

    } catch (error) {
        next(error);
    }
}


async function login(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render('index', {
                loginErrors: getErrorsByField(errors.array()),
                loginValues: req.body
            });
        }

        const { email, password } = req.body;

        const user = await User.findByEmail(email);

        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).render('index', {
                loginErrors: {
                    password: 'Неверный пароль'
                },
                loginValues: req.body
            });
        }


        req.session.regenerate((error) => {
            if (error) return next(error);

            req.session.user = {
                id: user.id,
                username: user.username,
                email: user.email
            };

            req.session.save((error) => {
                if (error) return next(error);

                res.redirect('/dashboard');
            });
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login
};
