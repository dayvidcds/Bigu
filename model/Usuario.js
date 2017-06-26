class Usuario {
    constructor(nome, cpf) {
        this._cpf = cpf;
        this._nome = nome;
        this._pontos = 0;
        this._veiculos = [];
        this._contatos = [];
        this._pedidosCarona = [];
        this._RotasFavoritas = [];
    }
}
module.exports = Usuario;