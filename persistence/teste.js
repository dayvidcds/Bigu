var con = require('./ConexaoDB')
var RepositorioUsuarios = require('./RepositorioUsuarios');

(async() => {
    try {
        var rep = new RepositorioUsuarios(con);

        await rep.inserir({ cpf: "1234", nome: "Thiago" });
        await rep.inserir({ cpf: "4321", nome: "Sostenes" });

        console.log('listando...' + await rep.listarTodos());

        //console.log(JSON.stringify(rep.listarTodos()));

        //await rep.remover("4321");

        //console.log(JSON.stringify(rep.listarTodos()));

        console.log("Fim.");
    } catch (err) {
        console.log("Erro: " + err);
    }

    //Desconectar do bando -- Apenas para fim de testes
    con.disconnect();
})();