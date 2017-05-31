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

    get usuario() {
        return this._usuario;
    }

    get caroneiros() {
        return this._caroneiros;
    }

    get inicio() {
        return this._inicio;
    }

    get fim() {
        return this._fim;
    }

    get rotas() {
        return this._rotas;
    }

    get vagasDisponiveis() {
        return this._vagasDisponiveis;
    }

    get veiculo() {
        return this._veiculo;
    }

    set usuario(u) {
        this._usuario = u;
    }

    /*Adicionar um novo caroneiro e 
    decrementar a quantidade de vagas disponíveis*/
    /*addCaroneiros(c, err) {
        if (this._vagasDisponiveis > 0) {
            this._caroneiros.push(c);
            this._vagasDisponiveis -= 1;
            //return true;
            err('Adicionado!');
        } else {
            err('Exception. Sem vaga disponivel');
        }
        //return false;
    }*/

    addCaroneiros(c) {
        this._caroneiros.push(c);
    }

    set inicio(i) {
        this._inicio = i;
    }

    set fim(f) {
        this._fim = f;
    }

    set rota(r) {
        this._rotas = r;
    }

    set vagasDisponiveis(vd) {
        this._vagasDisponiveis = vd;
    }

    set veiculo(v) {
        this._veiculo = v;
    }

}

module.exports = Carona;