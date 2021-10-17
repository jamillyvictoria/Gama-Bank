const userService = require('../services/user.service')
const User = require('../models/user')


const newUser = async (request, h) => {

    const user = new User(request.payload)

    console.log(user)

    let newCreateUser
    
    try {
        newCreateUser = await userService.createUser(user)
    } catch (exception) {
        console.log(exception);
        return h.response({
            message: exception.message
        }).code(exception.status)
    }

    if (newCreateUser) {
        return h.response({
            message: 'User created successfully'
        }).code(201)

    } else {
        return h.response({
            message: 'Login or CPF is registered'
        }).code(409)
    }

}

const findUserAccountByCpf = async (request, h) => {
    const cpf = request.params.cpf

    try {
        return await userService.findUserAccountByCpf(cpf)
    } catch (exception) {
        console.log(exception)
        return h.response({
            message: exception.message
        }).code(exception.status)
    }
}

module.exports = { newUser, findUserAccountByCpf }