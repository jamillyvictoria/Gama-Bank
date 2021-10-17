class Expense {
    constructor({ cc, value, isCredit, created_at }) {
        this.cc = cc
        this.value = value
        this.isCredit = isCredit
        this.created_at = created_at
    }
}

module.exports = Expense