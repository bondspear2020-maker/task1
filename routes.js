const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Dashboard');
});

router.get('/users', (req, res) => {
    res.json([
        { id: 1, name: 'Anna' },
        { id: 2, name: 'Ivan' }
    ]);

});

module.exports = router;