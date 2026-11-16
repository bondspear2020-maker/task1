const express = require('express');

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

// Подключение маршрутов
app.use(router);

app.listen(3000, () => {
    console.log('Server is running');
});
