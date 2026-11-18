const express_framework = require('express');
const express_framework_router = express_framework.Router();
const isAuthenticated = require('./middleware/auth');
const authController = require('./controllers/authController');
const {registerValidator, loginValidator} = require('./validators/authValidator');


express_framework_router.get('/', (req, res) => {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    res.render('index');
});

express_framework_router.post('/register', registerValidator, authController.register);

express_framework_router.post('/login', loginValidator, authController.login);


express_framework_router.get(
    '/dashboard',
    isAuthenticated,
    (req, res) => {
        res.render('dashboard', {
            user: req.session.user
        });
    }
);


express_framework_router.post(
    '/logout',
    isAuthenticated,
    (req, res, next) => {
        req.session.destroy((error) => {
            if (error) return next(error);
            res.clearCookie('sid');
            res.redirect('/');
        });
    }
);

module.exports = express_framework_router;