var express = require('express');
var app = express();
var routerUser = express.Router();
var bodyParser = require('body-parser');
var db = require('../Persistence/ConnectionDB');
routerUser.use(bodyParser.urlencoded({ extended: true }));
routerUser.use(bodyParser.json());

var UserRepository = require('../persistence/UserRepository');
var UserBusiness = require('../business/UserBusiness');
var UserController = require('../controller/UserController');
var RideController = require('../controller/RideController');

var uRep = new UserRepository(db)
var userBusiness = new UserBusiness(uRep)

app.use('/a', (er, res) => {
    res.send('Bem Vindo!')
});

app.use('/user', routerUser);

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
        res.send(resp)
    })
})

//Buscar todos os usuarios -OK
//Url: localhost:3000/user/find
routerUser.get('/find', (req, res) => {
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

module.exports = app