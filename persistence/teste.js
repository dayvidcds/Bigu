var con = require('./ConexaoDB')
var RouteRepository = require('./RouteRepository');

var user1 = { cpf: "1234", nome: "Sostenes Silva" };

var userRoute1 = { 
    user1,
    origin: 'cha grande, pe',
    destiny: 'gravata, pe'
 };

(async() => {
    try {
        var repRot = new RouteRepository(con);
        await repRot.insertRoute(userRoute1);
        //repRot.remove('5930d8365280ae3e58f78d32');
        //console.log('listando rotas...' + await repRot.findRoutes());

    } catch (err) {
        console.log("Erro: " + err);
    }

    //Desconectar do bando -- Apenas para fim de testes
    con.disconnect();
})();