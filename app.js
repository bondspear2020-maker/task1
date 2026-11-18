const express_framework = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const database = require('./configuration/database');
const application = express_framework();

// Handlebars
application.engine('handlebars', handlebars({
    defaultLayout: 'main'
}));

application.use(express_framework.static('public'));
application.set('view engine', 'handlebars');
application.set('views', path.join(__dirname, 'views'));

// Database
database.getConnection()
    .then(connection => {
        console.log('MySQL connected successfully!');
        connection.release();
    })
    .catch(error => {
        console.error('MySQL connection error:', error);
    });


// Middleware
application.use(express_framework.json());
application.use(express_framework.urlencoded({ extended: true }));


// Sessions
application.use(session({
    name: 'sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 1000 * 60 * 60
    }
}));

// Routes
const application_router = require('./routes');
application.use(application_router);
application.listen(3000);
