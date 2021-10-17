const Expense = require('../models/expense')
const expenseService = require('../services/expenses.service')

const processExpense = async (request, h) => {

    const expense = new Expense(request.payload)
    console.log(expense)

    try {
        await expenseService.entryExpense(expense)
    } catch (exception) {
        console.log(exception)
        return h.response({
            message: exception.message
        }).code(exception.status)
    }

    return h.response({
        message: 'Approved transaction'
    }).code(200)
}

module.exports = { processExpense }