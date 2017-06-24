var mongoose = require('mongoose')

class RideRepository {
    constructor(connection) {
        this.connection = connection
        this.schema = new mongoose.Schema({
            user: { type: mongoose.Schema.Types.ObjectId, ref:  'User'},
            hitchhiker: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
            start: { start: String }, // start time
            route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
            numberPlaces: { number: Number },
            veicle: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        })

        this.routeModel = this.connection.model('Route', this.schema)
        this.userModel = this.connection.model('User', this.schema)
        this.rideModel = this.connection.model('Ride', this.schema)

    }

    async insert(ride) {
        var error = ''
        var ride = new this.routeModel(ride)
        await route.save((err, res) => {
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
        await this.rideModel.find((err, res) => {
            if (err) {
                error = err
                return
            }
            result = res
        })
        if (!result) {
            throw new Error(error)
        }
    }

    async findHitchhiker(cpf) {
        var error = ''
        var result = null
        await this.rideModel.find({ 'cpf': cpf }, (err, res) => {

        }).populate('hitchhikers').exec((err, res) => {
            if (err) {
                error = err
                return
            }
            result = res
        })
        if (!result) {
            throw new Error(error)
        }
        return result
    }
        
     async remove(id) {
        var error = ''
        await this.rideModel.remove({ '_id': id }, (err, res) => {
            if (err) {
                error = err
            }
            else {
                console.log(id + ' removed')
            }
        })
        if (error != '') {
            throw new Error(error)
        }
    }

    async findeRideFriend(cpf) {
        var result = null
        var error = ''
        await this.rideModel.findOne({ 'cpf': cpf }, (err, res) => {
            if (err) {
                error = err
                return
            }
        }).populate('friendRide', (err, res) => {
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

    async setVagas(number) {
        var err = ''
        await this.routeModel.findOndeAndUpdate({ 'number': number }, (err, res) => {
            if (err) {
                error = err
                return
            }
            else {
                console.log('updated to ' + number + ' vacancies!')
            }
        })
        if (error != '') {
            throw new Error(error)
        }
    }

}