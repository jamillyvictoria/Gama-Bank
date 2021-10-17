const Joi = require('joi')
const { ExpenseResponseDTO } = require('./invoice.dto')

const StatementResponseDTO = Joi.object({
    cc: Joi.string(),
    expenses: Joi.array().items(ExpenseResponseDTO),
    balance: Joi.number()
}).label('StatementResponseDTO')

module.exports = { StatementResponseDTO }