var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../Persistence/ConnectionDB');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var UserRepository = require('../persistence/UserRepository');

(async() => {
    var uRep = new UserRepository(db);
    router.get('/find/:cpf', (req, res) => {
        uRep.findByCpf(req.params.cpf).then((resp) => {
            res.send(resp)
        })
    })

    router.get('/find', (req, res) => {
        uRep.findAll().then((resp) => {
            res.send(resp)
        })
    })

    router.post('/insert', (req, res) => {
        uRep.insert({
            cpf: req.body.cpf,
            name: req.body.name
        }).then((resp) => {
            res.send('ok')
        })
    })

    /*MULTIPLOS PARAMETROS
    router.get('/find/:cpf/:idade', (req, res) => {
            uRep.findByCpf(req.params.cpf).then((resp) => {
                res.send(resp + '_________' + req.params.idade)
            })
        })
         */


})()

module.exports = router;