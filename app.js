const express_framework = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const application = express_framework();

// Handlebars
application.engine('handlebars', handlebars({
    defaultLayout: 'main'
}));

application.set('view engine', 'handlebars');
application.set('views', path.join(__dirname, 'views'));

// Routes
const application_router = require('./routes');

// Middleware
application.use(express_framework.json());
application.use(express_framework.urlencoded({ extended: true }));

application.use(application_router);

// Start server
application.listen(3000);
