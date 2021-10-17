const service = require('../services/transaction.service')


const  newTransaction = async (request, res) => {

    // Variavel de retorno da transação
    try{
        await service.makeTransaction(request.payload)
        return res.response({
            message: 'Transação realizada com sucesso!'
        }).code(200)
    }
    catch(exception) {
        console.log(exception);
        return res.response({
            message: exception.message
        }).code(exception.status)
    }

}

module.exports = {newTransaction}