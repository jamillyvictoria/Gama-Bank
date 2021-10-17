const MESSAGE = 'Bank Name Invalid.'

class bankNameInvalid extends Error {
    constructor() {
        super(MESSAGE)
        this.message = MESSAGE
        this.status = 400
    }
}

module.exports = bankNameInvalid