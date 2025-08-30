const db = require('../config/database')

class TransactionRepository {
    async FindAll() {
        const queryString = "SELECT * FROM transactions"
        const [rows] = await db.query(queryString)
        return rows
    }

    async FindByUserId(userId) {
        const queryString = "SELECT * FROM transactions WHERE transaction_created_user_uuid = ?"
        const params = [userId]
        const [rows] = await db.query(queryString, params)
        return rows
    }

    async FindOne(transactionCode) {
        const queryString = "SELECT * FROM transactions WHERE transaction_code = ?"
        const params = [transactionCode]
        const [rows] = await db.query(queryString, params)
        return rows[0]
    }

    async Create(setData) {
        const queryString = "INSERT INTO transactions SET ?"
        const params = [setData]
        const result = await db.query(queryString, params)
        return { id: result.insertId, ...setData }
    }

    async Update(setData, transactionCode) {
        const queryString = "UPDATE transactions SET ? WHERE transaction_code = ?"
        const params = [setData, transactionCode]
        const result = await db.query(queryString, params)
        return { ...setData }
    }

    async Delete(transactionCode) {
        const queryString = "DELETE FROM transactions WHERE transaction_code = ?"
        const params = [transactionCode]
        const result = await db.query(queryString, params)
        return result.affectedRows > 0
    }

}

module.exports = new TransactionRepository()