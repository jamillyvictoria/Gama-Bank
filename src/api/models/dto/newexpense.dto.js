const Joi = require('joi')

const NewExpenseRequestDTO = Joi.object({
    cc: Joi.string().required(),
    value: Joi.string().required(),
    isCredit: Joi.bool().required()
}).label('NewExpenseRequestDTO')


const NewExpenseResponseDTO = Joi.object({
    message: Joi.string(),
}).label('Expense sucess')


module.exports = { NewExpenseRequestDTO, NewExpenseResponseDTO }