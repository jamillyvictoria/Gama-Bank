const MESSAGE = 'This account does not exist'

class InvalidCcException extends Error {
    constructor() {
        super(MESSAGE)
        this.message = MESSAGE
        this.status = 404
    }
}

module.exports = InvalidCcException