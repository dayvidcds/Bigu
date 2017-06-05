var mongoose = require('mongoose')

class RequestRideRepository {
    constructor(connection) {
        this.connection = connection
        this.Schema = new mongoose.Schema({
            ride: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride' },
            origin: { latitude: Number, longitude: Number },
            destination: { latitude: Number, longitude: Number },
            startTime: Date,
            endTime: Date
        })
        this.RequestRideModel = this.connection.model('RequestRide', this.Schema)

        //CÓDIGO PARA TESTE(ABAIXO)
        this.RideModel = this.connection.model('Ride', {
            nome: String
        })
    }

    async insert(requestRide) {
        var error = ''
        var requestRideRep = new this.RequestRideModel(requestRide)

        await requestRideRep.save((err, res) => {
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
        await this.RequestRideModel.findOneAndRemove({ _id: id }, (err, res) => {
            if (err) {
                error = err
                return
            }
        })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async findAll() {
        var error = ''
        var result = null
        await this.RequestRideModel.find((err, res) => {
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