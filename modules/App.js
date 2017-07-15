var express = require('express');
var app = express();

var UserController = require('../Controller/UserController');
app.use('/users', (UserController));
app.use('/', (er, res) => {
    res.send('Bem Vindo, inutil!')
})
module.exports = app