var mongoose = require('mongoose')
var RideRepository = require('./RideRepository.js')
var UserRepository = require('./UserRepository.js');

class RouteRepository {
    constructor(connection) {
        this.connection = connection
        this.schema = new mongoose.Schema({
            //user: user, depois que a persistencia carona estiver pronta bolar algo pra pegar os dados de lá :v
            //ride: mongoose.Schema.Types.ObjectId,
            ride: mongoose.Schema.Types.ObjectId,
            origin: { latitude: Number, longitude: Number },
            destination: { latitude: Number, longitude: Number },
            checkpointOwner: mongoose.Schema.Types.ObjectId,
            checkpoints: [mongoose.Schema.Types.ObjectId],
        })
        this.routeModel = this.connection.model('Route', this.schema)
            /*        this.userModel = new UserRepository(connection).userModel
                    this.rideModel = new RideRepository(connection).rideModel
            */
    }

    async addCheckpoint(routeId, checkpointId) {
        var error = ''
        await this.routeModel.findOneAndUpdate({ _id: routeId }, { $push: { checkpoints: checkpointId } },
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

    async setRide(routeId, rideId) {
        var error = ''
        await this.routeModel.findOneAndUpdate({ _id: routeId }, { $set: { ride: rideId } },
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

    async checkpointOwner(routeId, checkpointId) {
        var error = ''
        await this.routeModel.findOneAndUpdate({ _id: routeId }, { $push: { checkpointOwner: checkpointId } },
            (err, res) => {
                if (err) {
                    error = err
                    return
                }
                ''
            })

        if (error !== '') {
            throw new Error(error)
        }
    }

    async addCheckpoint(routeId, checkpointId) {
        var error = ''
        await this.routeModel.findOneAndUpdate({ _id: routeId }, { $push: { checkpoints: checkpointId } },
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
/*
    async insert(route) {
        return new Promise((resolve, reject) => {
            var error = ''
            var routeRep = new this.routeModel(route)
            await routeRep.save((err, res) => {
                if (err) {
                    error = err
                }
                resolve(res._id)
            })
            if (error != '') {
                throw new Error(error)
            }
        })
    }
*/
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
        return new Promise((resolve, reject) => {
            this.userModel.aggregate([
                    db.users.aggregate({
                        $match: {
                            cpf: cpf
                        }
                    }, {
                        $lookup: {
                            from: "users",
                            localField: "contacts",
                            foreignField: "cpf",
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
                ],
                function(err, res) {
                    if (err) {
                        reject(err)
                    }
                    resolve(res)
                }
            )
        })
    }

    async remove(id) {
        var error = ''
        await this.routeModel.findOneAndRemove({ _id: id }, (err, res) => {
            if (err) {
                error = err
            } else {
                console.log(routeId + ' removed')
            }
        })
        if (error != '') {
            throw new Error(error)
        }
    }

}

module.exports = RouteRepository