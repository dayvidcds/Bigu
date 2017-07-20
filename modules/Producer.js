var amqp = require('amqplib');
var utils = require('./utils');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

amqp.connect('amqp://localhost', { userId: 2 })
    .then(function(conexao) {
        console.log('Conexao estabelecida!');
        return conexao.createChannel();
    })
    .then(function(canal) {
        console.log('Canal criado!');
        var cont = 0;
        var dados;
		var msg = ''
		
		rl.on('line', (cidade) => {
			  // TODO: Log the answer in a database)
				msg = cidade
				dados = {
					rideId: '59706d2d3c9c8c3be493ce24', 
					position: cidade
				};
				//console.log(dados)
				
				//rl.close();
		});	
		
        setInterval(()=> {
            cont++;
			//BR-232, POSTO POLICIA RODOVIARIA FEDERAL , Gravatá - PE
			//BR-232, Km 73, s/n - Serra das Russas, Gravata - PE
			//O Rei das Coxinhas, R. Antônio Salgado de Souza, 6 - Novo Gravatá, Gravatá - PE
			//Rosa Flores, Av. Cicero Batista de Oliveira, 16282-16682 - Novo Gravata, Gravata - PE
			//Cha Grande, PE
			//Gravata, PE
			//Rainha da Pamonha - Novo Gravatá, Gravatá - PE
           if(msg != ''){
				canal.sendToQueue('owner_checkpoints',
					new Buffer(utils.toStr(dados)), {
						contentType: 'application/json'
					}
				);
				//console.log('Mensagem %s enviada', cont);
		   }
            
       }, 1000);

    });