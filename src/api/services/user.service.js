const userRepository = require('../repository/user.repository')
const PasswordLengthException = require('../../helpers/expections/password.exception')
const CPF = require('cpf')
const InvalidCpfException = require('../../helpers/expections/invalidcpf.exception')
const bankAccountService = require('./bankaccount.service')
const User = require('../models/user')
const UserNotFoundException = require('../../helpers/expections/usernotfound.exception')


const createUser = async (newUser) => {
    validateUserPassword(newUser)

    validateUserCpf(newUser)

    const isUserInDb = await findUserByLoginOrCpf(newUser)

    if (isUserInDb) {
        const userSavedOnDb = await userRepository.saveUser(newUser)
        console.log(userSavedOnDb)
        bankAccountService.createBankAccount(userSavedOnDb.insertId)
    }

    console.log("New User created " + isUserInDb)

    return isUserInDb
}

const validateUserPassword = newUser => {
    if (newUser.password.length <= 6) {
        console.log('invalid pass')
        throw new PasswordLengthException()
    }
}

const validateUserCpf = user => {
    const isValidCpf = CPF.isValid(user.cpf)

    if (!isValidCpf) {
        throw new InvalidCpfException()
    }

    console.log('CPF ' + isValidCpf)
}

const findUserByLoginOrCpf = async (user) => {
    const usersFromDb = await userRepository.findUserByLoginOrCpf(user)

    console.log("result of searching for new user in DB")
    return usersFromDb.length === 0
}


const findUserById = async (id) => {
    const userFromDb = await userRepository.findUserById(id)

    return userFromDb[0] //retornando o primeiro resultado da nossa consulta
}

const findUserAccountByCpf = async (cpf) => {
    const user = new User({ cpf, login: cpf })

    validateUserCpf(user)

    const [userFromDb] = await userRepository.findUserByLoginOrCpf(user)

    if (!userFromDb) {
        throw new UserNotFoundException()
    }

    return await bankAccountService.findAccountByUserId(userFromDb.id)
}

module.exports = {
    createUser,
    findUserByLoginOrCpf,
    validateUserPassword,
    validateUserCpf,
    findUserById,
    findUserAccountByCpf
}
