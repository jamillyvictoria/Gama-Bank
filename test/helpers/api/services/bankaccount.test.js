const bankAccountService = require('../../../../src/api/services/bankaccount.service')

jest.mock('../../../../src/api/repository/bankaccount.repository')
const bankAccountRepository = require('../../../../src/api/repository/bankaccount.repository')

const InvalidCcException = require('../../../../src/helpers/expections/InvalidCcException')



describe('BankAccount Service', () => {
    beforeEach(() => jest.clearAllMocks())

    it('return an exception when cc is invalid', async () => {
        bankAccountRepository.findAccountByCc.mockReturnValue({ cc: 1, userId: 1 })

        const bankAccount = await bankAccountService.findAccountByCc(1)

        expect(bankAccount.cc).toBe(1)
        expect(bankAccount.userId).toBe(1)
    })

})