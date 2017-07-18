var express = require('express');
var app = express();

var UserController = require('../controller/UserController');
var RideController = require('../controller/RideController');

app.use('/a', (er, res) => {
    res.send('Bem Vindo, inutil!')
});

app.use('/t/', (er, res) => {
    res.send('Bem Vindo, inutasdadsil!')
});

app.use('/users', (UserController));

//app.use('/rides', (RideController));

module.exports = app