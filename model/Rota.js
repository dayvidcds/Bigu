class Rota {
    constructor(carona, origem, destino) {
        this._carona = carona; // todas as informações de carona (usuario, caroneiros, rotas, etc)
        this._origem = origem; // origem da pessoa que vai ceder a carona
        this._destino = destino; // destino da pessoa que vai ceder a carona
        this._checkPointProprietario; // responsável por guardar se o usuario que tá cedendo a carona irá começar a se locomover
        this._checkPoints = []; // checkpoints dos usuários que recebrão a carona (após entrar no carro!)
    }
}
module.exports = Rota;