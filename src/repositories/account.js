const db = require('../config/database')

class AccountRepository {
    async FindAll() {
        const queryString = 'SELECT * FROM accounts'
        const [rows] = await db.query(queryString)
        return rows
    }

    async FindAllByParentCode(accountParentCode) {
        const queryString = "SELECT * FROM accounts WHERE account_parent_code = ?"
        const params = [accountParentCode]
        const [rows] = await db.query(queryString, params)
        return rows
    }

    async FindOne(accountCode) {
        const queryString = "SELECT * FROM accounts WHERE account_code = ?"
        const params = [accountCode]
        const [rows] = await db.query(queryString, params)
        return rows[0]
    }

    async Create(setData) {
        const queryString = "INSERT INTO accounts SET ?"
        const params = [setData]
        const result = await db.query(queryString, params)
        return { id: result.insertId, ...setData }
    }

    async Update(setData, accountCode) {
        const queryString = "UPDATE accounts SET ? WHERE account_code = ?"
        const params = [setData, accountCode]
        const result = await db.query(queryString, params)
        return { ...setData }
    }

    async Delete(accountCode) {
        const queryString = "DELETE FROM accounts WHERE account_code = ?"
        const params = [accountCode]
        const result = await db.query(queryString, params)
        return result.affectedRows > 0 
    }

}

module.exports = new AccountRepository()