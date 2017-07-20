var mongoose = require('mongoose')
var RideRepository = require('./RideRepository')

class RequestRideRepository {
    constructor(connection) {
        this.connection = connection
        this.Schema = new mongoose.Schema({
            ride: mongoose.Schema.Types.ObjectId,
            origin: { latitude: Number, longitude: Number },
            destination: { latitude: Number, longitude: Number },
            startTime: Date,
            endTime: Date
        })
        this.requestRideModel = this.connection.model('RequestRide', this.Schema)
            //this.rideModel = new RideRepository(connection).rideModel
            //CÓDIGO PARA TESTE(ABAIXO)
            /*this.RideModel = this.connection.model('Ride', {
                nome: String
            })*/
    }

    async insert(requestRide) {
        return new Promise((resolve, reject) => {
            var error = ''
            var requestRideRep = new this.requestRideModel(requestRide)
            requestRideRep.save((err, res) => {
                if (err) {
                    error = err
                }
                resolve(res._id)
            })
            if (error !== '') {
                throw new Error(error)
            }
        })
    }

    async setStartTimeById(id, startTime) {
        var error = ''
        await this.requestRideModel.findOneAndUpdate({ _id: id }, { $set: { startTime: startTime } }, (err, res) => {
            if (err) {
                error = err
                return
            }
        })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async setEndTimeById(id, endTime) {
        var error = ''
        await this.requestRideModel.findOneAndUpdate({ _id: id }, { $set: { endTime: endTime } }, (err, res) => {
            if (err) {
                error = err
                return
            }
        })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async removeById(id) {
        var error = ''
        await this.requestRideModel.findOneAndRemove({ _id: id }, (err, res) => {
            if (err) {
                error = err
                return
            }
        })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async findById(reRideId) {
            return new Promise((resolve, reject) => {
                var error = ''
                var result = null
                this.requestRideModel.findOne({ _id: reRideId }, (err, res) => {
                    if (err) {
                        error = err
                        reject(err)
                    }
                    if (res == null || res == '') {
                        console.log('request ride not exist')
                        reject('request ride not exist')
                    } else {
                        //console.log('_' + res + '_')
                        resolve(res)
                    }
                })
            })

        }
        /*
            async findById(id) {
                var error = ''
                return new Promise((resolve, reject) => {
                    this.requestRideModel.aggregate([{
                                $match: {
                                    _id: id
                                }
                            },
                            {
                                $lookup: {
                                    from: "rides",
                                    localField: "ride",
                                    foreignField: "_id",
                                    as: "ride_full"
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
            }*/

    async findAll() {
        var error = ''
        var result = null
        await this.requestRideModel.find((err, res) => {
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
}
module.exports = RequestRideRepository