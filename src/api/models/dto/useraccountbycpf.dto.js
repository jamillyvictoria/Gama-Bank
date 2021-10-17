const Joi = require('joi')

const UserAccountByCpfRequestDTO = Joi.object({
    cpf: Joi.string().required().description('user cpf'),
}).label('UserAccountByCpfRequestDTO')

const UserAccountByCpfResponseDTO = Joi.object({
    cc: Joi.number(),
    userId: Joi.number(),
    balance: Joi.number(),
    creditBalanceAvailable: Joi.number(),
    maxCredit: Joi.number(),
}).label('UserAccountByCpfResponseDTO')


const UserNotFoundResponseDTO = Joi.object({
    message: Joi.string(),
}).label('UserNotFoundResponseDTO')

module.exports = {
    UserAccountByCpfRequestDTO,
    UserAccountByCpfResponseDTO,
    UserNotFoundResponseDTO
}
