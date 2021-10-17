class User {
    constructor({id, name, cpf, login, password, salt}) {
        this.id = id
        this.name = name
        this.cpf = cpf
        this.login = login
        this.password = password
        this.salt = salt
    }
}   

module.exports = User