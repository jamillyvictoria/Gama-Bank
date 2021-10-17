const Joi = require('joi')

const TransactionRequestDTO = Joi.object({
    idUserHolder: Joi.number().required(),
    idUserDestiny: Joi.number().optional(),
    amount: Joi.number().required(),
    type: Joi.string().required(),
    cpfUserDestiny: Joi.string().optional(),
    bankName: Joi.string().optional()
}).label('TransactionRequestDTO')


const TransactionResponseDTO = Joi.object({
    message: Joi.string(),
}).label('TransactionResponseDTO')


module.exports = { TransactionRequestDTO, TransactionResponseDTO }