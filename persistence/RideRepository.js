var mongoose = require('mongoose')
var RouteRepository = require('./RouteRepository.js')
var UserRepository = require('./UserRepository.js')
var VeicleRepository = require('./VehicleRepository.js')

class RideRepository {
    constructor(connection) {
        this.connection = connection
        this.schema = new mongoose.Schema({
            user: String,
            hitchhikers: [mongoose.Schema.Types.ObjectId],
            start: Date, // start time
            end: Date,
            route: mongoose.Schema.Types.ObjectId,
            availableSpaces: Number,
            vehicle: String
        })
        this.rideModel = this.connection.model('Ride', this.schema)

        /*this.routeModel = new RouteRepository(connection).routeModel
        this.userModel = new UserRepository(connection).userModel
        this.vehicleModel = new VeicleRepository(connection).vehicleModel
        */
    }

    async setStart(rideId, startDate) {
        var error = ''
        await this.rideModel.findOneAndUpdate({ _id: rideId }, { $set: { 'start': startDate } }, (err, res) => {
            if (err) {
                error = err
                return
            }
        })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async setEnd(rideId, endDate) {
        var error = ''
        await this.rideModel.findOneAndUpdate({ _id: rideId }, { $set: { 'end': endDate } }, (err, res) => {
            if (err) {
                error = err
                return
            }
        })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async insert(ride) {
        return new Promise((resolve, reject) => {
            var error = ''
            var rideRep = new this.rideModel(ride)
            rideRep.save((err, res) => {
                if (err) {
                    error = err
                }
                if (error != '') {
                    console.log('Estourou erro')
                    throw new Error(error)
                }
                resolve(res._id)
            })
        })
    }

    async findById(rideId) {
        return new Promise((resolve, reject) => {
            var error = ''
            var result = null
            this.rideModel.findOne({ _id: rideId }, (err, res) => {
                if (err) {
                    error = err
                    reject(err)
                }
                if (res == null || res == '') {
                    console.log('ride not exist')
                    reject('ride not exist')
                } else {
                    //console.log('_' + res + '_')
                    resolve(res)
                }
            })
        })
    }

    async getVehicle(rideId) {
        var error = ''
        var result = null
        await this.rideModel.findOne({ _id: rideId }, { vehicle: 1, _id: 0 }, (err, res) => {
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
                            foreignField: "cpf",
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
                            foreignField: "cpf",
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
                            cpf: cpf
                        }
                    }, {
                        $lookup: {
                            from: "users",
                            localField: "hitchhikers",
                            foreignField: "cpf",
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
                            cpf: "$users_full.cpf",
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

    async setavailableSpaces(rideId, availableSpaces) {
        var error = ''
        await this.rideModel.findOneAndUpdate({ _id: rideId }, { $set: { 'availableSpaces': availableSpaces } }, (err, res) => {
            if (err) {
                error = err
                return
            }
        })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async addHitchhikers(rideId, biguId) {
        var error = ''
        await this.rideModel.findOneAndUpdate({ _id: rideId }, { $push: { 'hitchhikers': biguId } }, (err, res) => {
            if (err) {
                error = err
                return
            }
        })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async removeHitchhikers(rideId, biguId) {
        var error = ''
        await this.rideModel.findOneAndUpdate({ _id: rideId }, { $pull: { 'hitchhikers': biguId } }, (err, res) => {
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
        var error = ''
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