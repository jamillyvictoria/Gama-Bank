const MESSAGE = 'Insufficient Balance'

class BalanceNotAvailable extends Error {
    constructor() {
        super(MESSAGE)
        this.message = MESSAGE
        this.status = 406
    }
}

module.exports = BalanceNotAvailable