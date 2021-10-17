const service = require('../services/auth.service')


const login = async (request, h) => {

    
    const { username, password } = request.payload
    return await service.sign({ username, password })

}

const validate = async (request, h) => {
    const token = request.headers['x-access-token']
    if (!token) return { auth: false, message: 'No token provided' }

    try {
        const result = await service.verify(token) //isso é pra ficar dentro do arquivo de auth service? 
        return result
    } catch (error) {
        return error
    }
}

module.exports = { login, validate }