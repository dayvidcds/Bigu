var con = require('./ConnectionDB')
var RequestRideRepository = require('./RequestRideRepository')
var UserRepository = require('./UserRepository');

(() => {
    try {
        var userRep = new UserRepository(con);
        var reqRep = new RequestRideRepository(con)


    } catch (err) {
        console.log(err)
    }
})()