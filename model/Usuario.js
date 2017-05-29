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

    get nome() {
        return this._nome;
    }

    get pontos() {
        return this._pontos;
    }

    get cpf() {
        return this._cpf;
    }

    get veiculos() {
        return this._veiculos;
    }

    getVeiculoPorPlaca(placa) {
        var i, v;

        for (i = 0; i < this._veiculos.length; i++) {
            v = this._veiculos[i];
            if (v.placa == placa) {
                return v;
            }
        }
    }

    get contatos() {
        return this._contatos;
    }

    get pedidosCarona() {
        return this._pedidosCarona;
    }

    get rotasFavoritas() {
        return this._RotasFavoritas;
    }

    set nome(n) {
        this._nome = n;
    }

    set pontos(p) {
        this._pontos = p;
    }

    incrementarPontos(p) {
        this._pontos += p;
    }

    set cpf(c) {
        this._cpf = c;
    }

    addVeiculo(v) {
        this._veiculos.push(v);
    }

    removerVeiculo(v) {

    }

    addContato(c) {
        this._contatos.push(c);
        return this;
    }

    removerContato(c) {

    }

    addPedidoCarona(pc) {
        this._pedidosCarona.push(pc);
    }

    addRotaFavoritas(rf) {
        this._RotasFavoritas.push(rf);
    }

    removerRotaFavorita(rf) {

    }

}

module.exports = Usuario;