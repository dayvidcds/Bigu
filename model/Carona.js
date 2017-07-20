class Carona {
    constructor(usuario, inicio, vagasDisponiveis, veiculo) {
        this._usuario = usuario;
        this._caroneiros = [];
        this._inicio = inicio;
        this._fim;
        this._rotas = [];
        this._vagasDisponiveis = vagasDisponiveis;
        this._veiculo = veiculo;
    }
}
module.exports = Carona;