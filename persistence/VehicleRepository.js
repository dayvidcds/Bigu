var mongoose = require('mongoose')

class VehicleRepository {
    constructor(connection) {
        this.connection = connection
        this.Schema = new mongoose.Schema({
            plate: String
        })
        this.vehicleModel = this.connection.model('Vehicle', this.Schema)
    }

    async insert(vehicle) {
        var error = ''
        var vehicRep = new this.vehicleModel(vehicle)
        await vehicRep.save((err, res) => {
            if (err) {
                error = err
                return
            }
        })

        if (error !== '') {
            throw new Error(error)
        }
    }

    async removeByPlate(plate) {
        var error = ''
        await this.vehicleModel.findOneAndRemove({ plate: plate }, (err, res) => {
            if (err) {
                error = err
            }
        })
        if (error != '') {
            throw new Error(error)
        }
    }

    async findByPlate(plate) {
        var error = ''
        var result = null
        await this.vehicleModel.findOne({ plate: plate }, (err, res) => {
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

    async findAllVehicles() {
        var result = null
        var error = ''
        await this.vehicleModel.find((err, res) => {
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
module.exports = VehicleRepository