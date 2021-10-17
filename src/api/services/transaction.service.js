const bankAccountService = require('./bankaccount.service')
const cpf = require('cpf')
const invalidCpfException = require('../../helpers/expections/invalidcpf.exception')
const invalidBankName = require('../../helpers/expections/bankname.exception')
const balanceNotAvailable = require('../../helpers/expections/balancenotavaliable.exception')

const makeTransaction = async (transaction) => {
    const userId = transaction.idUserHolder
    const destinyUserId = transaction.idUserDestiny
    const value = transaction.amount
    const type = transaction.type
    const destinyUserCpf = transaction.cpfUserDestiny
    const bankName = transaction.bankName

    const userBankAccount = await bankAccountService.findAccountByUserId(userId)

    if (userBankAccount.balance - value >= 0) { //VERIFICANDO SE O SALDO DA CONTA DO CORRENTISTA APOS A TRANSACAO VAI SER MAIOR OU IGUAL A 0
        if (type === "inner") {
            await bankAccountService.findAccountByUserId(destinyUserId)
            bankAccountService.updateBalanceByUserId({
                userId: userId,
                balance: -value
            })

            bankAccountService.updateBalanceByUserId({
                userId: destinyUserId,
                balance: value
            })
            console.log("Transferência entre contas GamaBank realizada com sucesso.")
            
        }
        else if (type === "outer") {
            if (cpf.isValid(destinyUserCpf)) {
                if (bankName != "" && bankName != null && bankName != undefined) {
                    bankAccountService.updateBalanceByUserId({
                        userId: userId,
                        balance: -value
                    })
                    console.log("Transferência externa realizada com sucesso.")
                    
                }
                else {
                    throw new invalidBankName()
                }
            }
            else {
                throw new invalidCpfException()
            }
        }
    }
    else {
        throw new balanceNotAvailable()
    }
}

module.exports = { makeTransaction }