
const InvalidCcException = require('../../helpers/expections/InvalidCcException')
const BankAccount = require('../models/bankaccount')
const bankAccountRepository = require('../repository/bankaccount.repository')
const User = require('../models/user')

const INITIAL_BANKACCOUNT_CREDIT = 200
const INITIAL_BALANCE = 0

const createBankAccount = async (userId) => {
    console.log(' USER ID ', userId)
    const bankAccountCreated = new BankAccount({
        userId,
        balance: INITIAL_BALANCE,
        maxCredit: INITIAL_BANKACCOUNT_CREDIT,
        creditBalanceAvailable: INITIAL_BANKACCOUNT_CREDIT
    })

    await bankAccountRepository.saveBankAccount(bankAccountCreated)
    console.log(' BANK ACCOUNT CREATED', bankAccountCreated)
}

const updateCreditBalanceAvailable = async (bankAccount) => {
    return await bankAccountRepository.updateCreditBalanceAvailable(bankAccount)
}

const updateBalance = async (bankAccount) => {
    return await bankAccountRepository.updateBalance(bankAccount)
}
const updateBalanceByUserId = async (bankAccount) => {
    return await bankAccountRepository.updateBalanceByUserId(bankAccount)
}

const findAccountByCc = async (cc) => {
    const bankAccount = await bankAccountRepository.findAccountByCc(cc)
    console.log(' BANK ACCOUT BY CC', bankAccount)
    if (!bankAccount) {
        console.log('CAI NO INVALID', !bankAccount)
        throw new InvalidCcException()
    }
    console.log('findAccountByCc', bankAccount)
    return new BankAccount(bankAccount)
}

const validateCc = async (cc) => {
    return await findAccountByCc(cc)
}

const findAccountByUserId = async (userId) => {
    const bankAccount = await bankAccountRepository.findAccountByUserId(userId)
    if (!bankAccount) {
        throw new InvalidCcException()
    }
    return new BankAccount(bankAccount)
}

module.exports = {
    createBankAccount,
    updateCreditBalanceAvailable,
    findAccountByCc,
    validateCc,
    updateBalance,
    findAccountByUserId,
    updateBalanceByUserId
}