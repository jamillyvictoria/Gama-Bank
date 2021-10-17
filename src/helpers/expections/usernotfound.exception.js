const MESSAGE = 'User not found'

class UserNotFoundException extends Error {
    constructor() {
        super(MESSAGE)
        this.message = MESSAGE
        this.status = 404
    }
}

module.exports = UserNotFoundException