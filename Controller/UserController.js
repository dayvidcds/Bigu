/*var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../Persistence/ConnectionDB');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var UserRepository = require('../persistence/UserRepository');
var UserBusiness = require('../business/UserBusiness');

(async() => {
    var uRep = new UserRepository(db)
    var userBusiness = new UserBusiness(uRep)
        //console.log(userBusiness)
    router.get('/teste', (req, res) => {
        console.log('Users')
        res.send('teste ok')
    })

    //Buscar todos os contatos por cpf - OK
    //Url: localhost:3000/user/find/cpf_aqui
    router.get('/find/:cpf', (req, res) => {
        console.log('Users')
        userBusiness.findAllContacts(req.params.cpf).then((resp) => {
            res.send(resp)
        })
    })

    //Buscar todos os usuarios -OK
    //Url: localhost:3000/user/find
    router.get('/find', (req, res) => {
        userBusiness.findAllUsers().then((resp) => {
            res.send(resp)
        })
    })

    //Inserir usuario - OK
    //Parametros: cpf , nome
    router.post('/insert/user', (req, res) => {
        userBusiness.insert({
            cpf: req.body.cpf,
            name: req.body.name
        }).then((resp) => {
            res.send('ok')
        })
    })

    //remvoer usuario - OK
    //Parametros: cpf , nome
    router.post('/remove/user', (req, res) => {
        userBusiness.remove(
            req.body.cpf
        ).then((resp) => {
            res.send('ok')
        })
    })

    //Inserir contato - OK
    //Parametros: cpfUser , cpfContato
    router.post('/insert/contact', (req, res) => {
        console.log('cpfU ' + req.body.usercpf + " cpfC " + req.body.contactcpf)
        userBusiness.addContact(
            req.body.usercpf,
            req.body.contactcpf
        ).then((resp) => {
            res.send('ok')
        })
    })

    router.post('/insert/vehicle', (req, res) => {
        console.log('cpfU ' + req.body.cpf + " placa " + req.body.plate)
        userBusiness.addVehicle(
            req.body.cpf,
            req.body.plate
        ).then((resp) => {
            res.send('ok')
        })
    })

    router.post('/remove/vehicle', (req, res) => {
        console.log('cpfU ' + req.body.cpf + " placa " + req.body.plate)
        userBusiness.removeVehicle(
            req.body.cpf,
            req.body.plate
        ).then((resp) => {
            res.send('ok')
        })
    })

*/
/*MULTIPLOS PARAMETROS
router.get('/find/:cpf/:idade', (req, res) => {
        uRep.findByCpf(req.params.cpf).then((resp) => {
            res.send(resp + '_________' + req.params.idade)
        })
    })
     */

/*-------async addContact(userCpf, contactCpf)

    ---------async insert(user)

    ---------async addVehicle(cpf, plate)

    ---------async removeVehicle(cpf, plate)

    async findAllContacts(cpf)

    async activateRideMode(cpf)
*/
/*
})()

module.exports = router;*/