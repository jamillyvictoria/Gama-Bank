const mysql = require('mysql')
const { database } = require('../configs/env')

const connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: database.host,
    user: database.user,
    password: database.pass,
    database: database.name,
    port: database.port
})

const executeQuery = (sqlStatement) => new Promise(async (resolve, reject) => {
    try {
        const result = await execute(sqlStatement)

        resolve(result)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

const execute = (sqlStatement) => {
    return new Promise((resolve, reject) => {
        connectionPool.query(sqlStatement, (err, result) => {
            if (err) reject(err)
            else resolve(result)
        })
    })
}

module.exports = { executeQuery }