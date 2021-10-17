class BankAccount {
    constructor({ cc, userId, balance, creditBalanceAvailable, maxCredit }) {
        this.cc = cc
        this.userId = userId
        this.balance = balance
        this.creditBalanceAvailable = creditBalanceAvailable
        this.maxCredit = maxCredit
    }
}

module.exports = BankAccount