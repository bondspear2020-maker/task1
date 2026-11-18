const database = require('../configuration/database');

class User {

    static async create(username, email, passwordHash) {
        const [result] = await database.execute(
            `INSERT INTO users (username, email, password_hash)
             VALUES (?, ?, ?)`,
            [username, email, passwordHash]
        );

        return result.insertId;
    }

    static async findByEmail(email) {
        const [users] = await database.execute(
            'SELECT * FROM users WHERE email = ? LIMIT 1',
            [email]
        );

        return users[0] || null;
    }

    static async findAll() {
        const [users] = await database.execute(
            'SELECT id, username, email FROM users'
        );

        return users;
    }
}

module.exports = User;