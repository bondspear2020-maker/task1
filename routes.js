const express_framework = require('express');
const bcrypt = require('bcryptjs');

const User = require('./models/users');
const isAuthenticated = require('./middleware/auth');

const express_framework_router = express_framework.Router();

// Главная
express_framework_router.get('/', (req, res) => {
    res.render('index', {
        user: req.session.user
    });
});

// Форма регистрации
express_framework_router.get('/register', (req, res) => {
    res.render('register');
});

// Регистрация
express_framework_router.post('/register', async (req, res, next) => {

    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password || password.length < 8) {
            return res.status(400).send('Invalid registration data');
        }

        const existingUser = await User.findByEmail(email);

        if (existingUser) {
            return res.status(409).send('Email already registered');
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const userId = await User.create(
            username,
            email,
            passwordHash
        );

        req.session.regenerate(async (error) => {

            if (error) return next(error);

            req.session.user = {
                id: userId,
                username,
                email
            };

            req.session.save((error) => {
                if (error) return next(error);

                res.redirect('/profile');
            });
        });

    } catch (error) {
        next(error);
    }
});

// Форма авторизации
express_framework_router.get('/login', (req, res) => {
    res.render('login');
});

// Авторизация
express_framework_router.post('/login', async (req, res, next) => {

    try {
        const { email, password } = req.body;

        const user = await User.findByEmail(email);

        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).send('Invalid email or password');
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

                res.redirect('/profile');
            });
        });

    } catch (error) {
        next(error);
    }
});

// Защищённая страница
express_framework_router.get(
    '/profile',
    isAuthenticated,
    (req, res) => {
        res.render('profile', {
            user: req.session.user
        });
    }
);

// Выход
express_framework_router.post('/logout', isAuthenticated, (req, res, next) => {

    req.session.destroy((error) => {

        if (error) return next(error);

        res.clearCookie('sid');

        res.redirect('/login');
    });
});

module.exports = express_framework_router;