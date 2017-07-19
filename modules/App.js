var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('../Persistence/ConnectionDB');

var routerUser = express.Router();
routerUser.use(bodyParser.urlencoded({ extended: true }));
routerUser.use(bodyParser.json());

var routerBigu = express.Router();
routerBigu.use(bodyParser.urlencoded({ extended: true }));
routerBigu.use(bodyParser.json());

var routerRide = express.Router();
routerRide.use(bodyParser.urlencoded({ extended: true }));
routerRide.use(bodyParser.json());

var UserRepository = require('../persistence/UserRepository');
var UserBusiness = require('../business/UserBusiness');
//var UserController = require('../controller/UserController');

var RideRepository = require('../persistence/RideRepository');
var RideBusiness = require('../business/RideBusiness');
//var RideController = require('../controller/Ri');

var RequestRideRepository = require('../persistence/RequestRideRepository');
var RequestRideBusiness = require('../business/RequestRideBusiness');
//var UserController = require('../controller/UserController');

var BiguRepository = require('../persistence/BiguRepository');
var BiguBusiness = require('../business/BiguBusiness');
//var UserController = require('../controller/UserController');

var RouteRepository = require('../persistence/RouteRepository');
var RouteBusiness = require('../business/RouteBusiness');

var uRep = new UserRepository(db)
var riRep = new RideRepository(db)
var reRiRep = new RequestRideRepository(db)
var biRep = new BiguRepository(db)
var roRep = new RouteRepository(db)

var userBusiness = new UserBusiness(uRep)
var rideBusiness = new RideBusiness(riRep, uRep, roRep, biRep)
var requestRideBusiness = new RequestRideBusiness(reRiRep, riRep, uRep, biRep)
var biguBusiness = new BiguBusiness(biRep, uRep, reRiRep)
var routeBusiness = new RouteBusiness(roRep, riRep)

app.use('/a', (er, res) => {
    res.send('Bem Vindo!')
});

app.use('/user', routerUser);

app.use('/ride', routerRide);

app.use('/bigu', routerBigu);

//INICIO USUÁRIO

//console.log(userBusiness)
routerUser.get('teste/', (req, res) => {
    console.log('Users')
    res.send('teste ok')
})

//Buscar todos os contatos por cpf - OK
//Url: localhost:3000/user/find/cpf_aqui
routerUser.get('/find/:cpf', (req, res) => {
    console.log('Users')
    userBusiness.findAllContacts(req.params.cpf).then((resp) => {
        console.log(resp)
        res.send(resp)
    })
})

//Buscar todos os usuarios -OK
//Url: localhost:3000/user/find
routerUser.get('/find', (req, res) => {
    console.log('entrou')
    userBusiness.findAllUsers().then((resp) => {
        res.send(resp)
    })
})

//Inserir usuario - OK
//Parametros: cpf , nome
routerUser.post('/insert/user', (req, res) => {
    userBusiness.insert({
        cpf: req.body.cpf,
        name: req.body.name
    }).then((resp) => {
        res.send('ok')
    })
})

//remvoer usuario - OK
//Parametros: cpf , nome
routerUser.post('/remove/user', (req, res) => {
    userBusiness.remove(
        req.body.cpf
    ).then((resp) => {
        res.send('ok')
    })
})

//Inserir contato - OK
//Parametros: cpfUser , cpfContato
routerUser.post('/insert/contact', (req, res) => {
    console.log('cpfU ' + req.body.usercpf + " cpfC " + req.body.contactcpf)
    userBusiness.addContact(
        req.body.usercpf,
        req.body.contactcpf
    ).then((resp) => {
        res.send('ok')
    })
})

routerUser.post('/insert/vehicle', (req, res) => {
    console.log('cpfU ' + req.body.cpf + " placa " + req.body.plate)
    userBusiness.addVehicle(
        req.body.cpf,
        req.body.plate
    ).then((resp) => {
        res.send('ok')
    })
})

routerUser.post('/remove/vehicle', (req, res) => {
    console.log('cpfU ' + req.body.cpf + " placa " + req.body.plate)
    userBusiness.removeVehicle(
        req.body.cpf,
        req.body.plate
    ).then((resp) => {
        res.send('ok')
    })
})
app.use('/a', routerUser);

//INICIO REQUEST RIDE
//Pedir carona
//Url: localhost:3000/user/find
//userCpf, {origin: ruas , destination: ruas}, destination
routerRide.post('/request', (req, res) => {
    console.log(req.body)
    routeBusiness.insert(req.body.origin, req.body.destination).then((routeId) => {
        roRep.findById(routeId).then((ro) => {
            requestRideBusiness.requestRide(
                req.body.userCpf,
                req.body.rideId,
                ro.origin,
                ro.destination
            ).then((resp) => {
                res.send(resp)
            })
        })
    })
})

//Buscar todos os usuarios -OK
//Url: localhost:3000/user/find
//userCpf, rideId, origin, destination
routerRide.post('/cancel', (req, res) => {
    requestRideBusiness.cancellRequestRide(
        req.body.userCpf,
        req.body.rideId
    ).then((resp) => {
        res.send('ok')
    })
})

//Buscar todos os usuarios -OK
//Url: localhost:3000/user/find
//userCpf, {origin: ruas , destination: ruas} , availableSpaces, plate
routerRide.post('/give', (req, res) => {
    routeBusiness.insert(req.body.origin, req.body.destination).then((routeId) => {
        console.log(req.body)
        rideBusiness.giveRide(
            req.body.userCpf,
            routeId,
            req.body.availableSpaces,
            req.body.plate
        ).then((rideId) => {
            riRep.findById(rideId).then((ride) => {
                res.send(ride)
            })
        })
    })

})

//Buscar todas as rotas dos contatos
//Url: localhost:3000/user/find
//userCpf, routeId, availableSpaces, plate
routerRide.get('/list/:cpf', (req, res) => {
    console.log(req.params.cpf)
    rideBusiness.findContactsRides(req.params.cpf).then((resp) => {
        res.send(resp)
    })
})

//Iniciar carona -- quem deu a carona
//Url: localhost:3000/user/find
//userCpf, routeId, availableSpaces, plate
routerRide.get('/start/:rideid', (req, res) => {
    rideBusiness.start(req.params.rideid).then((resp) => {
        res.send(resp)
    })
})

//Encerrar carona -- quem deu a carona
//Url: localhost:3000/user/find
//userCpf, routeId, availableSpaces, plate
routerRide.get('/end/:rideid', (req, res) => {
    rideBusiness.end(req.params.rideid).then((resp) => {
        res.send(resp)
    })
})

//Entrar da carona -- quem pegou a carona
//Url: localhost:3000/user/find
//parametro: biguId
routerBigu.get('/enter/:biguid', (req, res) => {
    biguBusiness.enter(req.params.biguid).then((resp) => {
        res.send(resp)
    })
})

//Sair da carona -- quem pegou a carona
//Url: localhost:3000/user/find
//parametro: biguId
routerBigu.get('/exit/:biguid', (req, res) => {
    biguBusiness.exit(req.params.biguid).then((resp) => {
        res.send(resp)
    })
})

module.exports = app