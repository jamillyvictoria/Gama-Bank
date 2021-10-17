const bankAccountService = require('./bankaccount.service')
const expenseService = require('./expenses.service')
const Statement = require('../models/statement')

const getStatementByCc = async (cc, isCredit) => {
    const bankAccount = await bankAccountService.findAccountByCc(cc)
    console.log(bankAccount)

    const balance = bankAccount.balance
    console.log(balance)

    const expenses = await expenseService.listExpenses(cc, isCredit)

    const statement = new Statement({ cc, expenses, balance })
    console.log(statement)

    return statement

}

module.exports = { getStatementByCc }