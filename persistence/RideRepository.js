var mongoose = require('mongoose')
var RouteRepository = require('./RouteRepository.js')
var UserRepository = require('./UserRepository.js')
var VeicleRepository = require('./VehicleRepository.js')

class RideRepository {
    constructor(connection) {
        this.connection = connection
        this.schema = new mongoose.Schema({
            user: mongoose.Schema.Types.ObjectId,
            hitchhikers: [mongoose.Schema.Types.ObjectId],
            start: Date, // start time
            route: mongoose.Schema.Types.ObjectId,
            availableSpace: Number,
            vehicle: mongoose.Schema.Types.ObjectId
        })
        this.rideModel = this.connection.model('Ride', this.schema)

        /*this.routeModel = new RouteRepository(connection).routeModel
        this.userModel = new UserRepository(connection).userModel
        this.vehicleModel = new VeicleRepository(connection).vehicleModel
        */
    }

    async insert(ride) {
        var error = ''
        var rideRep = new this.rideModel(ride)
        await rideRep.save((err, res) => {
            if (err) {
                error = err
            }
        })
        if (error != '') {
            throw new Error(error)
        }
    }

    async findById(rideId) {
        var error = ''
        var result = null
        await this.rideModel.findOne({ _id: rideId }, (err, res) => {
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

    async getVehicle(rideId) {
        var error = ''
        return new Promise((resolve, reject) => {
            this.rideModel.aggregate([{
                        $match: {
                            _id: rideId
                        }
                    },
                    {
                        $lookup: {
                            from: "vehicles",
                            localField: "vehicle",
                            foreignField: "_id",
                            as: "vehicle_full"
                        }
                    }
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

    async findAll() {
        var error = ''
        var result = null
        await this.rideModel.find((err, res) => {
            if (err) {
                error = err
                return
            }
            result = res
        })
        if (result == null) {
            throw new Error(error)
        }
    }


    async getHitchhikers(rideId) {
        var error = ''
        return new Promise((resolve, reject) => {
            this.rideModel.aggregate([{
                        $match: {
                            _id: rideId
                        }
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "hitchhikers",
                            foreignField: "_id",
                            as: "hitchhikers_full"
                        }
                    }
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

    async checkHitchhiker(rideId, cpf) {
        var error = ''
        return new Promise((resolve, reject) => {
            this.rideModel.aggregate([{
                        $match: {
                            _id: rideId
                        }
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "hitchhikers",
                            foreignField: "_id",
                            as: "hitchhikers_full"
                        }
                    }, {
                        $match: {
                            "hitchhikers_full.cpf": cpf
                        }
                    }
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
        await this.rideModel.remove({ '_id': id }, (err, res) => {
            if (err) {
                error = err
            } else {
                console.log(id + ' removed')
            }
        })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async findContactsRides(cpf) {
        var error = ''
        return new Promise((resolve, reject) => {
            this.rideModel.aggregate([{
                        $match: {
                            cpf: '1'
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
                            localField: "users_full.givenRides",
                            foreignField: "_id",
                            as: "users_full.rides_full"
                        }
                    }, {
                        $unwind: "$users_full.rides_full"
                    },
                    {
                        $group: {
                            _id: "$users_full._id",
                            ride: {
                                $push: "$users_full.rides_full"
                            }
                        }
                    }
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

    async setVagas(rideId, number) {
        var err = ''
        await this.rideModel.findOneAndUpdate({ _id: rideId }, { $set: { 'availableSpace': number } }, (err, res) => {
            if (err) {
                error = err
                return
            }
        })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async setRoute(rideId, routeId) {
        var err = ''
        await this.rideModel.findOneAndUpdate({ _id: rideId }, { $set: { route: routeId } }, (err, res) => {
            if (err) {
                error = err
                return
            }
        })
        if (error !== '') {
            throw new Error(error)
        }
    }

}

module.exports = RideRepository