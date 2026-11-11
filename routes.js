const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to my Node.js Server!</h1>

        <form action="/create-user" method="POST">
            <input
                type="text"
                name="username"
                placeholder="Enter your username"
                required
            >
            <button type="submit">Create User</button>
        </form>
    `);
});


router.get('/users', (req, res) => {
    res.send(`
        <h1>Users List</h1>
        <ul>
            <li>User 1</li>
            <li>User 2</li>
            <li>User 3</li>
        </ul>
    `);
});


router.post('/create-user', (req, res) => {
    const username = req.body.username;

    console.log('New username:', username);

    res.send(`
        <h1>User created successfully!</h1>
        <p>Username: ${username.replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[char])}</p>
        <a href="/">Back to Home</a>
    `);
});

module.exports = router;