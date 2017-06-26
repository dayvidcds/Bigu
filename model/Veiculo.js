class Veiculo {
    constructor(placa) {
        this._placa = placa;
    }
    get placa() {
        return this._placa;
    }
}
module.exports = Veiculo;