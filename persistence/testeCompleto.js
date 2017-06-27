var con = require('./ConnectionDB')
var UserRepository = require('./UserRepository');
var VehicleRepository = require('./VehicleRepository');
var RideRepository = require('./RideRepository');
var RouteRepository = require('./RouteRepository');
var UserBusiness = require('../business/UserBusiness');

function pretty(obj) {
    console.log(JSON.stringify(obj, null, 4));
}

(async() => {
    try {
        var veRep = new VehicleRepository(con);
        var uRep = new UserRepository(con);

        /*for (i = 0; i < 5; i++) {
            uRep.insert({
                cpf: i,
                name: 'user ' + i
            })
        }*/

        /* (NEGOCIOS) ADICIONA UM VEICULO
        await veRep.insert({ plate: '1' })
        var veId = await veRep.findByPlate('1')
        uRep.addVehicle('4', veId.id)
        */

        /*(NEGOCIOS) INSERIR AMIGO*/
        /*var cont = await uRep.findByCpf('1')
        await uRep.addContact('3', cont.id)
        cont = await uRep.findByCpf('3')
        await uRep.addContact('1', cont.id)
*/
        //INSERIR CARONA
        /*var ridRep = new RideRepository(con)
        await ridRep.insert({
            user: '594ed6670cc6192b8c9efe56',
            vehicle: '594eec7f24eec61db843d536',
            availableSpace: 2
        })*/
        /*
                new RouteRepository(con)
                var ridRep = new RideRepository(con)
                ridRep.findContactsRides('1')
                    //PEDIR CARONA
                    //var ridRep = new RideRepository(con)
          */ //var caronas = 


        /*
                uRep.findContacts('1', function callback(res) {
                    pretty(res)
                })
        */

        /*        uRep.findVehicles('3', function callback(res) {
                    pretty(res)
                })
        */


        var uBus = new UserBusiness(uRep)
            /* await uBus.insert({
            name: 'zeca',
            cpf: '11'
        })

        pretty(await uRep.findByCpf('11'))
*/

        pretty(await uBus.findAllContacts('1'))

        //pretty(await uRep.findByCpf('4'))

        //pretty(await uRep.findVehicles('4'))

        //console.log(JSON.stringify(await uRep.findAll(), null, 4))
        //pretty(await uRep.findVehicles('1'))
        /*
                for (i = 0; i < 5; i++) {
                    veRep.insert({
                        plate: i
                    })
                }
        */

        //uRep.addContact('1', '594ece231b2d8126c85b5c0f')

        //await pretty(await uRep.findVehicles('1'))
        //con.disconnect()

    } catch (err) {
        console.log('Log >>' + err)
    }
})()