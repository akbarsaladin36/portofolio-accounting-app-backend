const db = require('../config/database')

class JournalEntryRepository {
    async FindAll() {
        const queryString = "SELECT * FROM journal_entries"
        const [rows] = await db.query(queryString)
        return rows
    }

    async FindByUserId(userId) {
        const queryString = "SELECT * FROM journal_entries WHERE journal_created_user_uuid = ?"
        const params = [userId]
        const [rows] = await db.query(queryString, params)
        return rows
    }

    async FindOne(journalCode) {
        const queryString = "SELECT * FROM journal_entries WHERE journal_code = ?"
        const params = [journalCode]
        const [rows] = await db.query(queryString, params)
        return rows[0]
    }

    async Create(setData) {
        const queryString = "INSERT INTO journal_entries SET ?"
        const params = [setData]
        const result = await db.query(queryString, params)
        return { id: result.insertId, ...setData }
    }

    async Update(setData, journalCode) {
        const queryString = "UPDATE journal_entries SET ? WHERE journal_code = ?"
        const params = [setData, journalCode]
        const result = await db.query(queryString, params)
        return { ...setData }
    }

    async Delete(journalCode) {
        const queryString = "DELETE FROM journal_entries WHERE journal_code = ?"
        const params = [journalCode]
        const result = await db.query(queryString, params)
        return result.affectedRows > 0
    }
}

module.exports = new JournalEntryRepository()