var mongoose = require('mongoose');
var db_config = require('../config/db.json');

console.log(db_config);

class ConexaoDB {

    constructor() {
        if (!ConexaoDB.instancia) {
            ConexaoDB.instancia = this;
            console.log('Primeiro');
        }

        return ConexaoDB.instancia;
    }

    conectar(callback_conexao) {

        var url;
        url = 'mongodb://' + db_config.endereco + ':' + db_config.porta + '/' + db_config.db;

        mongoose.connect(url, function(err, res) {
            if (err) {
                console.log('ERRO');
            } else {
                callback_conexao(mongoose);
                console.log('Sucesso');
            }
        });
    }

    desconectar() {
        mongoose.disconnect();
        console.log('Desconectado');
    }
}

/*
var a;
a = new ConexaoDB();
a.conectar((conexao) => {
    console.log(conexao.version);
});*/

const instancia = new ConexaoDB();
Object.freeze(instancia);
//console.log(instancia === new ConexaoDB());
module.exports = instancia;