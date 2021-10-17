const bankAccountService = require('./bankaccount.service')
const expenseService = require('./expenses.service')
const Invoice = require('../models/invoice')

const getPendingInvoiceByCc = async (cc, isCredit) => {
    await bankAccountService.validateCc(cc)

   const expenses = await expenseService.listExpenses(cc, isCredit)

    const amountInvoice = expenseService.summarizeExpenses(expenses)

    const pendingInvoice = new Invoice({ cc, expenses, amount: amountInvoice })

    return pendingInvoice

}

module.exports = { getPendingInvoiceByCc }