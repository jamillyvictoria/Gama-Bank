const MESSAGE = 'CPF is not valid'

class InvalidCpfException extends Error {
    constructor() {
        super(MESSAGE)
        this.message = MESSAGE
        this.status = 406
    }
}

module.exports = InvalidCpfException