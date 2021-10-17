const Joi = require('joi')

const BadRequestDTO = Joi.object({
    statusCode: Joi.number(),
    error: Joi.string(),
    message: Joi.string(),
}).label('BadRequestDTO')

module.exports = { BadRequestDTO }