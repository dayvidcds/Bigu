var con = require('./ConexaoDB.js')
var RepositorioUsuarios = require('./a.js');

(async() => {
    try {
        var rep = new RepositorioUsuarios(con);

        rep.inserir({ cpf: "1234", nome: "Thiago" });
        await rep.inserir({ cpf: "4321", nome: "Sostenes" });

        console.log(JSON.stringify(rep.listarTodos()));

        await rep.remover("4321");

        console.log(JSON.stringify(rep.listarTodos()));

        console.log("Fim.");
    } catch (err) {
        console.log("Erro: " + err);
    }

    console.log()

})();