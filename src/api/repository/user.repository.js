const database = require('../../helpers/database')
const crypto = require('../../helpers/mycrypto')
const User = require('../models/user')

const findUserByLoginOrCpf = async (user) => {
    const query = `SELECT * FROM users WHERE cpf = "${user.cpf}"` +
        `OR login = "${user.login}";`

    return await database.executeQuery(query)
}

const findUserById= async (id) => {
    const query = `SELECT * FROM users WHERE id = "${id}";`

    return await database.executeQuery(query)
}

const saveUser = async (user) => { //falar pra momo q eu acho q aqui ta errado
    const encrypt = await crypto.encryptPassword(user.password, null)
    console.log(encrypt)
    user.salt = encrypt.salt
    user.password = encrypt.encryptedPassword

    const query = `INSERT INTO users (name, cpf, login, password, salt)` +
        `VALUES ("${user.name}", "${user.cpf}", "${user.login}", "${user.password}",` +
        `"${user.salt}");`

    return await database.executeQuery(query)
}

module.exports = { findUserByLoginOrCpf, saveUser, findUserById} 