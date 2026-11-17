const express_framework = require('express');
const express_framework_router = express_framework.Router();
//==================================================================//
express_framework_router.get('/', (req, res) => {
    let ViewData = {
        title: 'My application'
    };
    res.render('index', ViewData);
});
express_framework_router.post('/add-user', (req, res) => {
    const username = req.body.username;

    res.redirect(`/users?username=${encodeURIComponent(username)}`);
});
express_framework_router.get('/users', (req, res) => {
    let ViewData = {
        username: req.query.username
    };

    res.render('users', ViewData);
});
module.exports = express_framework_router;