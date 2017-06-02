var mongoose = require('mongoose');

class UserRepository {
    constructor(conexao) {
        this.conexao = conexao;
        this.schema = new mongoose.Schema({
            cpf: String,
            nome: String,
            pontos: Number,
            veiculos: [String],
            contatos: [String],
            pedidosCarona: [String]
        });

        this.usuarioModel = this.conexao.model("Usuarioa", this.schema);

    }

    async inserir(usuario) {
        var error = "";
        var user = new this.usuarioModel(usuario);
        await user.save((err, res) => {
            if (err) {
                error = err;
            }
        });
        if (error != "") {
            throw new Error(error);
        }
    }

    async remover(cpf) {
        var error = "";
        await this.usuarioModel.remove({ cpf: cpf }, (err, res) => {
            if (err) {
                error = err;
            }
        });
        if (error != "") {
            throw new Error(error);
        }
    }

    async listarTodos() {
        var result = null;
        var error = "";
        await this.usuarioModel.find((err, res) => {
            if (err) {
                error = err;
                return;
            }
            result = res;
        });
        if (result == null) {
            throw new Error(error);
        }
        return result;
    }

    async listarCpf(cpf) {
        var result = null;
        var error = "";
        await this.usuarioModel.findOne(({ cpf: cpf} ), (err, res) => {
            if (err) {
                error = err;
                return;
            }
            result = res;
        });
        if (result == null) {
            throw new Error(error);
        }
        return result;
    }


}

module.exports = UserRepository;
