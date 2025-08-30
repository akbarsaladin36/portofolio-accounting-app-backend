const mysql = require('mysql2/promise')
const dotenv = require('dotenv')
dotenv.config()

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

const testConnection = async () => {
    let conn;
    try {
        conn = await connection.getConnection();
        await conn.ping();
        console.log('✅ Database connected successfully');
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1);
    } finally {
        if (conn) conn.release();
    }
};

testConnection()

module.exports = connection