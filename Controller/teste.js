var Consumer = require('./Consumer')
var Producer = require('./Producer');
var UserBusiness = require('../business/UserBusiness')
var UserRepository = require('../persistence/UserRepository')
var mongoConn = require('../persistence/ConnectionDB');

(async() => {

    try {
        var uRep = new UserRepository(mongoConn)
        var uBus = new UserBusiness(uRep)

        await uBus.addContact('2', '3')

        var c = new Consumer()
            /*c.start('mensagens', (msg) => {
                try {
                    uBus.insert(msg).catch((error) => {})
                    console.log(msg)
                } catch (error) {}
            })*/

        /*var p = new Producer()
        await p.start()

        var cpf = 0
        setInterval(() => {
            cpf++
            p.sendToQueue('mensagens', {
                nome: 'sostenes',
                cpf: cpf
            })
        }, 200)*/
    } catch (error) {
        console.log(error)
    }

})()