const { status } = require('../api/controllers/app.controller')
const authController = require('../api/controllers/auth.controller')
const userController = require('../api/controllers/user.controller')
const expenseController = require('../api/controllers/expenses.controller')
const invoiceController = require('../api/controllers/invoice.controller')
const statementController = require('../api/controllers/statement.controller')
const transactionController = require('../api/controllers/transaction.controller')

const ApiDocs = require('./apidocs')

const Joi = require('joi')

const root = {
    method: 'GET',
    path: '/',
    handler: status,
    options: {
        tags: ['api'],
        description: 'Verificação do status da aplicação',
        notes: 'Pode ser utilizado sempre que outra aplicação estiver monitorando'
    }
}

const auth = {
    method: 'POST',
    path: '/auth',
    handler: authController.login,
    options: ApiDocs.login
}

const validate = {
    method: 'GET',
    path: '/login/verify',
    handler: authController.validate
}

const newuser = {
    method: 'POST',
    path: '/signup',
    handler: userController.newUser,
    options: ApiDocs.signup
}

const expenses = {
    method: 'POST',
    path: '/expense',
    handler: expenseController.processExpense,
    options: ApiDocs.expenses
}

const invoice = {
    method: 'GET',
    path: '/invoice/{cc?}',
    handler: invoiceController.pendingInvoice,
    options: ApiDocs.invoice
}

const statement = {
    method: 'GET',
    path: '/statement/{cc?}',
    handler: statementController.bankStatement,
    options: ApiDocs.statement
}

const userAccount = {
    method: 'GET',
    path: '/bank-account/{cpf?}',
    handler: userController.findUserAccountByCpf,
    options: ApiDocs.userAccount
}
const transaction ={
    method: 'PUT',
    path:'/transaction',
    handler: transactionController.newTransaction,
    options: ApiDocs.transaction
}

module.exports = [root, auth, validate, newuser, expenses, invoice, statement, userAccount, transaction]
