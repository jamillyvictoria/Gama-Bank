const PasswordLengthException = require('../../../../src/helpers/expections/password.exception')
const InvalidCpfException = require('../../../../src/helpers/expections/invalidcpf.exception')
const {
    validateUserPassword,
    findUserByLoginOrCpf,
    createUser,
    validateUserCpf
} = require('../../../../src/api/services/user.service')

jest.mock('../../../../src/api/repository/user.repository')
const userRepository = require('../../../../src/api/repository/user.repository')

jest.mock('../../../../src/api/services/bankaccount.service')
const bankAccountService = require('../../../../src/api/services/bankaccount.service')

const User = require('../../../../src/api/models/user')

describe('User Service', () => {
    beforeEach(() => jest.clearAllMocks())

    it('dont return an exception when user pass is greater than 6 digits', () => {
        const user = { password: '1234567' }

        validateUserPassword(user)
    })

    it('return an exception when user pass is smaller than 6 digits', () => {
        const user = { password: '123' }

        const exception = () => validateUserPassword(user)

        expect(exception).toThrow(PasswordLengthException)
    })

    it('dont return an exception when cpf is valid', () => {
        const user = new User({ cpf: '31382053053' })

        validateUserCpf(user)
    })

    it('return an exception when cpf is not valid', () => {
        const user = new User({ cpf: '1345' })

        const exception = () => validateUserCpf(user)

        expect(exception).toThrow(InvalidCpfException)
    })

    it('return true when not find user in db', async () => {
        userRepository.findUserByLoginOrCpf.mockReturnValue([])

        const result = await findUserByLoginOrCpf({})

        expect(result).toBe(true)
    })

    it('return false when find user in db', async () => {
        userRepository.findUserByLoginOrCpf.mockReturnValue([{ user: 'user name' }])

        const result = await findUserByLoginOrCpf({})

        expect(result).toBe(false)
    })

    it('create user generate a user in db and a bank account', async () => {
        userRepository.findUserByLoginOrCpf.mockReturnValue([])
        userRepository.saveUser.mockReturnValue({ insertId: 1 })

        const user = new User({ password: '1234567', cpf: '40281542007', login: 'userlogin' })

        const result = await createUser(user)

        expect(userRepository.saveUser).toHaveBeenCalledWith(user)
        expect(bankAccountService.createBankAccount).toHaveBeenCalledWith(1)
        expect(result).toBe(true)
    })

    it('dont create user when its on database', async () => {
        userRepository.findUserByLoginOrCpf.mockReturnValue([{ login: 'login' }])

        const user = new User({ password: '1234567', cpf: '40281542007', login: 'userlogin' })

        const result = await createUser(user)

        expect(userRepository.saveUser).not.toHaveBeenCalled()
        expect(bankAccountService.createBankAccount).not.toHaveBeenCalled()
        expect(result).toBe(false)
    })
})