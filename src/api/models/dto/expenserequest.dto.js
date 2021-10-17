const Joi = require('joi')

const ExpenseRequestDTO = Joi.object({
    cc: Joi.string().required(),
    value: Joi.number().required(),
    isCredit: Joi.boolean().required()
}).label('ExpenseRequestDTO')

module.exports = { ExpenseRequestDTO }