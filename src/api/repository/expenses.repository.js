const database = require('../../helpers/database')
const Expense = require('../models/expense')

const createExpense = async (expense) => {
    const query = `INSERT INTO expenses (cc, value, isCredit) ` +
        `VALUES (${expense.cc}, ${expense.value}, ${expense.isCredit});`

    return await database.executeQuery(query)
}

const listExpenses = async (cc, isCredit) => {
    const query = `SELECT value, created_at ` +
        `FROM expenses` +
        ` WHERE cc = ${cc} ` +
        `AND isCredit = ${isCredit} ` +
        `ORDER BY created_at DESC`
    return await database.executeQuery(query)
}

module.exports = { createExpense, listExpenses }