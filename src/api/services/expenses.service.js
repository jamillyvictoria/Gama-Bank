const bankAccountService = require('./bankaccount.service')
const BalanceNotAvailable = require('../../helpers/expections/balancenotavaliable.exception')
const expenseRepository = require('../repository/expenses.repository')
const Email = require('../modules/email')
const userService = require('./user.service')


const INVOICE_INITIAL_VALUE = 0

const entryExpense = async (expense) => {
    const bankAccount = await bankAccountService.findAccountByCc(expense.cc)
    await processExpense(bankAccount, expense)

    await createExpense(expense)

}

const processExpense = async (bankAccount, expense) => {
    console.log('process expense', expense.isCredit)
    if (expense.isCredit) {
        await processCreditExpense(bankAccount, expense)
    } else {
        await processDebitExpense(bankAccount, expense)
    }

    await sendEmailConfirmExpense(bankAccount, expense)
}

const sendEmailConfirmExpense = async (bankAccount, expense) => {
    const user = await userService.findUserById(bankAccount.userId)

    if (isEmailValid(user.login)) {
        console.log(`Sending email to ${user.login}`)
        const expenseType = expense.isCredit ? "Crédito" : "Débito"
        const message = expense.isCredit ? `O seu crédito disponível é: R$ ${bankAccount.creditBalanceAvailable}` : `O seu saldo disponível é: R$ ${bankAccount.balance}`

        const email = new Email(user.login,
            `Olá ${user.name}, seu lançamento de ${expenseType} foi realizado com sucesso!`,
            `O valor da sua transação foi de: R$ ${expense.value} \n${message}`)

        await email.run()
    }
}

const summarizeExpenses = (expenses) => {
    const summarizeExpense = (accumulator, expense) => accumulator + parseFloat(expense.value)

    const amountExpenses = expenses.reduce(summarizeExpense, INVOICE_INITIAL_VALUE)
    return amountExpenses
}

const createExpense = async (expense) => {
    const createdExpense = await expenseRepository.createExpense(expense)
    return createdExpense
}

const processCreditExpense = async (bankAccount, expense) => {
    console.log(bankAccount)
    console.log(expense)
    if (bankAccount.creditBalanceAvailable < expense.value) {
        throw new BalanceNotAvailable()
    }

    bankAccount.creditBalanceAvailable -= expense.value

    await bankAccountService.updateCreditBalanceAvailable(bankAccount)
}

const processDebitExpense = async (bankAccount, expense) => {
    console.log(expense)
    if (bankAccount.balance < expense.value) {
        throw new BalanceNotAvailable()
    }

    bankAccount.balance -= expense.value
    console.log('after debit expense', bankAccount)

    await bankAccountService.updateBalance(bankAccount)
}

const listExpenses = async (cc, isCredit) => {
    const expenses = await expenseRepository.listExpenses(cc, isCredit)
    return expenses
}

const isEmailValid = (email) => {
    const validEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return validEmailRegex.test(String(email).toLowerCase())
}

module.exports = {
    entryExpense,
    summarizeExpenses,
    processCreditExpense,
    processCreditExpense,
    listExpenses
}