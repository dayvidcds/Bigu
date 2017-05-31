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
        for (i = 0; i < this._veiculos.length; i++) {
            if (this._veiculos[i].placa == v.placa) {
                this._veiculos.splice(i, 1);
                return;
            }
        }
    }

    addContato(c) {
        this._contatos.push(c);
        return this;
    }

    removerContato(c) {
        for (i = 0; i < this._contatos.length; i++) {
            if (this._contatos[i].cpf == c.cpf) {
                this._contatos.splice(i, 1);
                return;
            }
        }
    }

    addPedidoCarona(pc) {
        this._pedidosCarona.push(pc);
    }

    addRotaFavoritas(rf) {
            this._RotasFavoritas.push(rf);
        }
        /*
        removerRotaFavorita(rf) {
            for(i=0; i< this._RotasFavoritas.length; i++){
                if(this._RotasFavoritas[i].placa == rf.){
                    this._RotasFavoritas.splice(i, 1);
                }
            } 
        }*/

}

module.exports = Usuario;