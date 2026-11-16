const express = require('express');
const path = require('path');

const app = express();


app.use((req, res, next) => {
    console.log(`[middleware 1] ${req.method} ${req.url}`);
    next();
});

app.use((req, res, next) => {
    console.log('[middleware 2] log some else..');
    next();
});

const router = require('./routes');

// Парсинг входящих данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Подключение маршрутов
app.use(router);

app.listen(3000, () => {
    console.log('Server is running');
});
