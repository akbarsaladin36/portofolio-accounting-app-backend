const db = require('../config/database')

class AuthRepository {
    async FindUsername(username) {
        const queryString = "SELECT * FROM users WHERE user_username = ?"
        const params = [username]
        const [rows] = await db.query(queryString, params)
        return rows[0]
    }

    async Create(setData) {
        const queryString = "INSERT INTO users SET ?"
        const params = [setData]
        const result = await db.query(queryString, params)
        return { id: result.insertId, ...setData }
    }

}

module.exports = new AuthRepository()