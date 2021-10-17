// const Invoice = require('../models/invoice')
const statementService = require('../services/statement.service')

const bankStatement = async (request, h) => {
    const isCredit = false
    const cc = request.params.cc
    console.log(cc)

    try {
        return await statementService.getStatementByCc(cc, isCredit)
    } catch (exception) {
        console.log(exception)
        return h.response({
            message: exception.message
        }).code(exception.status)
    }
}

module.exports = { bankStatement }