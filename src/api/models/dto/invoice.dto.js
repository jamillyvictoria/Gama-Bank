const Joi = require('joi')

const InvoiceRequestDTO = Joi.object({
    cc: Joi.string().required().description('bank account cc number'),
}).label('InvoiceRequestDTO')

const ExpenseResponseDTO = Joi.object({
    value: Joi.number(),
    created_at: Joi.date()
}).label('ExpenseResponseDTO')

const InvoiceResponseDTO = Joi.object({
    cc: Joi.string(),
    expenses: Joi.array().items(ExpenseResponseDTO),
    amount: Joi.number()
}).label('InvoiceResponseDTO')


const NotFoundCCResponseDTO = Joi.object({
    message: Joi.string(),
}).label('NotFoundCCResponseDTO')

module.exports = {
    InvoiceRequestDTO,
    InvoiceResponseDTO,
    NotFoundCCResponseDTO,
    ExpenseResponseDTO
}