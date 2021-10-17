const Joi = require('joi')

const NewUserRequestDTO = Joi.object({
    name: Joi.string().required(),
    cpf: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().required()
}).label('NewUserRequestDTO')


const NewUserResponseDTO = Joi.object({
    message: Joi.string(),
}).label('NewUserResponseDTO')


module.exports = { NewUserRequestDTO, NewUserResponseDTO }