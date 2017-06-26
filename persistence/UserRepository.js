var mongoose = require('mongoose')
var VechicleRepository = require('./VehicleRepository')
var RideRepository = require('./RideRepository')
var RouteRepository = require('./RouteRepository');

//var userModelT = mongoose.model('User', this.schema)

class UserRepository {
    constructor(connection) {
        this.connection = connection
        this.schema = new mongoose.Schema({
            cpf: String,
            name: String,
            points: Number,
            vehicles: [mongoose.Schema.Types.ObjectId],
            contacts: [mongoose.Schema.Types.ObjectId],
            requestsRide: [mongoose.Schema.Types.ObjectId],
            favoriteRoutes: [mongoose.Schema.Types.ObjectId],
            givenRide: mongoose.Schema.Types.ObjectId
        })

        this.userModel = this.connection.model('User', this.schema)

        //CÓDIGOS PARA TESTE, ABAIXO
        //this.vechicleModel = this.connection.model('Vehicle', { plate: String })
        //this.rideModel = this.connection.model('Ride', {})
        //this.routeModel = this.connection.model('Route', {})

        //new VechicleRepository(connection)
        //new RideRepository(connection)
        //new RouteRepository(connection)
    }

    async insert(user) {
        var error = ''
        var userRep = new this.userModel(user)
        await userRep.save((err, res) => {
            if (err) {
                error = err
            }
        })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async removeByCpf(cpf) {
        var error = ''
        await this.userModel.findOneAndRemove({ cpf: cpf }, (err, res) => {
            if (err) {
                error = err
            }
        })
        if (error != '') {
            throw new Error(error)
        }
    }

    async findByCpf(cpf) {
        var error = ''
        var result = null
        await this.userModel.findOne({ cpf: cpf }, (err, res) => {
            if (err) {
                error = err
                return
            }
            result = res
        })
        if (result == null) {
            throw (new Error(error))
        }
        return result
    }

    async findAll() {
        var result = null
        var error = ''
        await this.userModel.find((err, res) => {
            if (err) {
                error = err
                return
            }
            result = res
        })
        if (result == null) {
            throw new Error(error)
        }
        return result
    }

    async addPoints(cpf, points) {
        var error = ''
        await this.userModel.findOneAndUpdate({ cpf: cpf }, { $inc: { points: points } }, (err, res) => {
            if (err) {
                error = err
                return
            }
        })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async findGivenRide(cpf, callback) {
        var error = ''
        await this.userModel.aggregate([{
                    $match: {
                        cpf: cpf
                    }
                },
                {
                    $lookup: {
                        from: "rides",
                        localField: "givenRide",
                        foreignField: "_id",
                        as: "given_ride_full"
                    }
                }
            ],
            function(err, res) {
                if (err) {
                    error = err
                    return
                }
                callback(res)
            }
        )
        if (error !== '') {
            throw new Error(error)
        }
    }

    async addContact(cpf, contactId) { //Cpf de quem recebe/ _id do contato
        var error = ''
        await this.userModel.findOneAndUpdate({ cpf: cpf }, { $push: { contacts: contactId } },
            (err, res) => {
                if (err) {
                    error = err
                    return
                }
            })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async removeContact(cpf, contactId) { //Cpf de quem recebe/ _id do contato
        var error = ''
        await this.userModel.findOneAndUpdate({ cpf: cpf }, { $pull: { contacts: contactId } },
            (err, res) => {
                if (err) {
                    error = err
                    return
                }
            })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async findContacts(cpf, callback) {
        var error = ''
        await this.userModel.aggregate([{
                    $match: {
                        cpf: cpf
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "contacts",
                        foreignField: "_id",
                        as: "users_full"
                    }
                }
            ],
            function(err, res) {
                if (err) {
                    error = err
                    return
                }
                callback(res)
            }
        )
        if (error !== '') {
            throw new Error(error)
        }
    }

    async addVehicle(cpf, vehicleId) { //Cpf de quem recebe/ _id do veiculo
        var error = ''
        await this.userModel.findOneAndUpdate({ cpf: cpf }, { $push: { vehicles: vehicleId } },
            (err, res) => {
                if (err) {
                    error = err
                    return
                }
            })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async removeVehicle(cpf, vehicleId) { //Cpf de quem recebe/ _id do veiculo
        var error = ''
        await this.userModel.findOneAndUpdate({ cpf: cpf }, { $pull: { vehicles: vehicleId } },
            (err, res) => {
                if (err) {
                    error = err
                    return
                }
            })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async findVehicles(cpf, callback) {
        var error = ''
        await this.userModel.aggregate([{
                    $match: {
                        cpf: cpf
                    }
                },
                {
                    $lookup: {
                        from: "vehicles",
                        localField: "vehicles",
                        foreignField: "_id",
                        as: "vehicles_full"
                    }
                }
            ],
            function(err, res) {
                if (err) {
                    error = err
                    return
                }
                callback(res)
            }
        )
        if (error !== '') {
            throw new Error(error)
        }
    }

    async addRequestRide(cpf, requestRideId) { //Cpf de quem recebe/ _id do pedido de carona
        var error = ''
        await this.userModel.findOneAndUpdate({ cpf: cpf }, { $push: { requestsRide: requestRideId } },
            (err, res) => {
                if (err) {
                    error = err
                    return
                }
            })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async removeRequestRide(cpf, requestRideId) { //Cpf de quem recebe/ _id do pedido de carona
        var error = ''
        await this.userModel.findOneAndUpdate({ cpf: cpf }, { $pull: { requestsRide: requestRideId } },
            (err, res) => {
                if (err) {
                    error = err
                    return
                }
            })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async findRequestsRide(cpf, callback) {
        var error = ''
        await this.userModel.aggregate([{
                    $match: {
                        cpf: cpf
                    }
                },
                {
                    $lookup: {
                        from: "requestsRide",
                        localField: "requestsRide",
                        foreignField: "_id",
                        as: "requests_ride_full"
                    }
                }
            ],
            function(err, res) {
                if (err) {
                    error = err
                    return
                }
                callback(res)
            }
        )
        if (error !== '') {
            throw new Error(error)
        }
    }

    async addFavoriteRoute(cpf, favoriteRouteId) { //Cpf de quem recebe/ _id da rota favorita
        var error = ''
        await this.userModel.findOneAndUpdate({ cpf: cpf }, { $push: { favoriteRoutes: favoriteRouteId } },
            (err, res) => {
                if (err) {
                    error = err
                    return
                }
            })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async removeFavoriteRoute(cpf, favoriteRouteId) { //Cpf de quem recebe/ _id da rota favorita
        var error = ''
        await this.userModel.findOneAndUpdate({ cpf: cpf }, { $pull: { favoriteRoutes: favoriteRouteId } },
            (err, res) => {
                if (err) {
                    error = err
                    return
                }
            })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async findFavoriteRoutes(cpf) {
        var error = ''
        await this.userModel.aggregate([{
                    $match: {
                        cpf: cpf
                    }
                },
                {
                    $lookup: {
                        from: "favoriteRoutes",
                        localField: "favoriteRoutes",
                        foreignField: "_id",
                        as: "favorite_routes_full"
                    }
                }
            ],
            function(err, res) {
                if (err) {
                    error = err
                    return
                }
                callback(res)
            }
        )
        if (error !== '') {
            throw new Error(error)
        }
    }
}


module.exports = UserRepository