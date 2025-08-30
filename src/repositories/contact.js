const db = require('../config/database')

class ContactRepository {
    async FindAll() {
        const queryString = "SELECT * FROM contacts"
        const [rows] = await db.query(queryString)
        return rows
    }

    async FindByUserId(userId) {
        const queryString = "SELECT * FROM contacts WHERE user_uuid = ?"
        const params = [userId]
        const [rows] = await db.query(queryString, params)
        return rows
    }

    async FindOne(contactCode) {
        const queryString = "SELECT * FROM contacts WHERE contact_code = ?"
        const params = [contactCode]
        const [rows] = await db.query(queryString, params)
        return rows[0]
    }

    async Create(setData) {
        const queryString = "INSERT INTO contacts SET ?"
        const params = [setData]
        const result = await db.query(queryString, params)
        return { id: result.insertId, ...setData }
    }

    async Update(setData, contactCode) {
        const queryString = "UPDATE contacts SET ? WHERE contact_code = ?"
        const params = [setData, contactCode]
        await db.query(queryString, params)
        return { ...setData }
    }

    async Delete(contactCode) {
        const queryString = "DELETE FROM contacts WHERE contact_code = ?"
        const params = [contactCode]
        const result = await db.query(queryString, params)
        return result.affectedRows > 0
    }

}

module.exports = new ContactRepository()