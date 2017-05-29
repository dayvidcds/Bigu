class Rota {
    constructor(carona, origem, destino) {
        this._carona = carona; // todas as informações de carona (usuario, caroneiros, rotas, etc)
        this._origem = origem; // origem da pessoa que vai ceder a carona
        this._destino = destino; // destino da pessoa que vai ceder a carona
        this._checkPointProprietario; // responsável por guardar se o usuario que tá cedendo a carona irá começar a se locomover
        this._checkPoints = []; // checkpoints dos usuários que recebrão a carona (após entrar no carro!)
    }

    get carona() {
        return this._carona;
    }

    get origem() {
        return this._origem;
    }

    get destino() {
        return this._destino;
    }

    get checkPointProprietario() {
        return this._checkPointProprietario;
    }

    get checkPoints() {
        return this._checkPoints;
    }

    verificaEstaNaRota(origemPessoaQueRecebeCarona, distanciaPercorrer) {
        //calcula se está: se estuver retorna true, se não retorna false
        return false;
    }

    //Faz o check do propietario da carona
    fazerCheckPointPropietario() {
        this._checkPointProprietario = ck;
    }

    addCheckPoint(checkpoint) {
        this._checkPoints.push(checkpoint);
    }

}

module.exports = Rota;