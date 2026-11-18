const database = require('../configuration/database');

class User {

    static async create(username, email) {
        const [result] = await database.execute(
            'INSERT INTO users (username, email) VALUES (?, ?)',
            [username, email]
        );

        return result.insertId;
    }

    static async findAll() {
        const [users] = await database.execute(
            'SELECT * FROM users'
        );

        return users;
    }
}

module.exports = User;