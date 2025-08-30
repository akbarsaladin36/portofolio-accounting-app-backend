const db = require('../config/database')

class UserRepository {
    async FindAll() {
        const queryString = "SELECT user_uuid,user_username,user_email,user_first_name,user_last_name,user_role,user_status_cd FROM users WHERE user_status_cd = 'active'"
        const [rows] = await db.query(queryString)
        return rows
    }

    async FindOne(username) {
        const queryString = "SELECT user_uuid,user_username,user_email,user_first_name,user_last_name,user_role,user_status_cd FROM users WHERE user_username = ?"
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

    async Update(setData, username) {
        const queryString = "UPDATE users SET ? WHERE user_username = ?"
        const params = [setData, username]
        const result = await db.query(queryString, params)
        if(result.affectedRows == 0) return null
        return this.FindOne(username)
    }

    async Delete(username) {
        const queryString = "DELETE FROM users WHERE user_username = ?"
        const params = [username]
        const result = await db.query(queryString, params)
        return result.affectedRows > 0
    }
}

module.exports = new UserRepository()