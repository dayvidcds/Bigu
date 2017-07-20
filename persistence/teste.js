//var con = require('./ConnectionDB')
//var UserRepository = require('./UserRepository');

(async() => {
    try {

        var a = ['111', '222', '333']
        int

        // var rep = new UserRepository(con);
        /*
                await rep.insert({
                    cpf: '1111',
                    nome: 'Thiago',
                    vehicles: ['593481ba69b895bfdb1c940c', '593481ba69b895bfdb1c940d']
                });
                await rep.insert({
                    cpf: '2222',
                    nome: 'Sostenes',
                    vehicles: ['593481ba69b895bfdb1c940e', '593481ba69b895bfdb1c940f']
                });
                await rep.insert({
                    cpf: '3333',
                    nome: 'Dayvid',
                    vehicles: ['593481ba69b895bfdb1c940e', '593481ba69b895bfdb1c940f']
                });
        */
        //console.log('listando...' + await rep.listarTodos());
        //await rep.addVehicle('1111', '593481ba69b895bfdb1c940e')
        //  console.log('listando: ' + JSON.stringify(await rep.findAll()))
        //await rep.removeVehicle('1111', '593481ba69b895bfdb1c940e')
        //console.log('listando: ' + JSON.stringify(await rep.findVehicles('1111')))
        console.log('Fim.');
    } catch (err) {
        console.log('Erro: ' + err);
    }

    //Desconectar do banco -- Apenas para fim de testes
    con.disconnect();
})();