var con = require('./PUsuario');

var inserir = function(usuario) {
    con.conectar(function(connex) {
        console.log(connex.version);
    });
}

var usuario;
inserir.call(usuario);

/*
var a = require('./a');
console.log(a);*/
//console.log(new UserStore());

class PUsuario {

    constructor() {
        if (!PUsuario.instancia) {
            PUsuario.instancia = this;
        }
        return PUsuario.instancia;
    }

    inserir(callback) {

    }

    inserir(callback_conexao) {

    }


}

/*
var a;
a = new PUsuario();
a.conectar((conexao) => {
    console.log(conexao.version);
});*/

const instancia = new PUsuario();
Object.freeze(instancia);
//console.log(instancia === new PUsuario());
module.exports = instancia;