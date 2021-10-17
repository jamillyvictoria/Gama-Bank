const MESSAGE = 'User password can not be less than 6 digits'

class PasswordLengthException extends Error {
    constructor() {
        super(MESSAGE)
        this.message = MESSAGE
        this.status = 406
    }
}

module.exports = PasswordLengthException