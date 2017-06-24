var mongoose = require('mongoose')
var RideRepository = require('./RideRepository.js')
var UserRepository = require('./UserRepository.js') 

class RouteRepository {
    constructor(connection) {
        this.connection = connection
        this.schema = new mongoose.Schema({
            //user: user, depois que a persistencia carona estiver pronta bolar algo pra pegar os dados de lá :v
            ride: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride' },
            origin: { latitude: Number, longitude: Number },
            destination: { latitude: Number, longitude: Number },
            checkpointOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            checkpoints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        })

        this.routeModel = this.connection.model('Route', this.schema)
        this.userModel = new UserRepository(connection).userModel
        this.rideModel = new RideRepository(connection).rideModel

    }

    async setCheckpointOwner(id) {
        var error = ''
        await this.routeModel.update({ $set: { '_id': id } }, (err, res) => {
            if (err) {
                error = err
            }
        })
        if (error != '') {
            throw new Error(error)
        }
    }

    async setCheckpoint(id) {
        var error = ''
        await this.routeModel.update({ '_id': id }, (err, res) => {
            if (err) {
                error = err
            }
        })
        if (error != '') {
            throw new Error(error)
        }
    }

    async insert(route) {
        var error = ''
        var routeRep = new this.routeModel(route)
        await routeRep.save((err, res) => {
            if (err) {
                error = err
            }
        })
        if (error != '') {
            throw new Error(error)
        }
    }

    async findAll() {
        var error = ''
        var result = null
        await this.routeModel.find((err, res) => {
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

    async findFriendsRoutes(cpf) {
        var error = ''
        var result = null
        await this.userModel.aggregate([
            db.users.aggregate({
                $match: {
                    cpf: cpf
                }
            }, {
                $lookup: {
                    from: "users",
                    localField: "contacts",
                    foreignField: "_id",
                    as: "users_full"
                }
            }, {
                $unwind: "$users_full"
            }, {
                $lookup: {
                    from: "rides",
                    localField: "users_full.given_rides",
                    foreignField: "_id",
                    as: "users_full.rides_full"
                }
            }, {
                $unwind: "$users_full.rides_full"
            }, {
                $lookup: {
                    from: "routes",
                    localField: "users_full.rides_full.route",
                    foreignField: "_id",
                    as: "users_full.rides_full.route_full"
                }
            }, {
                $match: {
                    "users_full.rides_full.route_full.end": null
                }
            }, {
                $unwind: "$users_full.rides_full.route_full"
            }, {
                $group: {
                    _id: "$users_full.cpf",
                    route: {
                        $push: "$users_full.rides_full.route_full"
                    }
                }
                })
        ])
    }

    async remove(id) {
        var error = ''
        await this.routeModel.findOneAndRemove({ '_id': id }, (err, res) => {
            if (err) {
                error = err
            }
            else {
                console.log(routeId + ' removed')
            }
        })
        if (error != '') {
            throw new Error(error)
        }
    }

}

module.exports = RouteRepository