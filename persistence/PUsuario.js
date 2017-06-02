var con = require('../persistence/ConexaoDB');
const Schema = con.Schema;

class PUsuario {

    constructor() {
        if (!PUsuario.instancia) {

            this._UsuarioShema = new Schema({
                cpf: String,
                nome = String,
                pontos = Number,
                veiculos = [String],
                contatos = [id],
                pedidosCarona = [],
                RotasFavoritas = ...

            });

            PUsuario.instancia = this;
        }
        return PUsuario.instancia;
    }

    inserir(callback) {

    }

    remover(callback) {

    }

    atualizar(callback) {

    }

    pesquisarPorCPF(callback) {

    }

    obterTodos(callback) {

    }




}

const instancia = new PUsuario();
Object.freeze(instancia);
module.exports = instancia;

/**
 * var inserir = function(usuario) {
    con.conectar(function(connex) {
        console.log(connex.version);
    });
}

var usuario;
inserir.call(usuario);

var a = require('./a');
console.log(a);
//console.log(new UserStore());

 */