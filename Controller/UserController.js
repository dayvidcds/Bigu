var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../Persistence/ConnectionDB');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var UserRepository = require('../persistence/UserRepository');

(() => {

    var uRep = new UserRepository(db);

    router.get('/', (req, res) => {
        var result = uRep.findAll()
        res.send(result)
    })

})()

module.exports = router;