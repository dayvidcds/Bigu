var mongoose = require('mongoose')
    /*var VechicleModel = require('./VehicleRepository')
    var RideModel = require('./RideRepository')
    var RouteModel = require('./RouteRepository')*/

//var UserModelT = mongoose.model('User', this.schema)

class UserRepository {
    constructor(connection) {
        this.connection = connection
        this.schema = new mongoose.Schema({
            cpf: String,
            name: String,
            points: Number,
            vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }],
            contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
            requestsRide: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ride' }],
            favoriteRoutes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Route' }]
        })
        this.UserModel = this.connection.model('User', this.schema)

        //CÓDIGOS PARA TESTE, ABAIXO
        this.VechicleModel = this.connection.model('Vehicle', { plate: String })
        this.RideModel = this.connection.model('Ride', {})
        this.RouteModel = this.connection.model('Route', {})
    }

    async insert(user) {
        var error = ''
        var userRep = new this.UserModel(user)
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
        await this.UserModel.findOneAndRemove({ cpf: cpf }, (err, res) => {
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
        await this.UserModel.findOne({ cpf: cpf }, (err, res) => {
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
        await this.UserModel.find((err, res) => {
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
        await this.UserModel.findOneAndUpdate({ cpf: cpf }, { $inc: { points: points } }, (err, res) => {
            if (err) {
                error = err
                return
            }
        })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async addContact(cpf, contactId) { //Cpf de quem recebe/ _id do contato
        var error = ''
        await this.UserModel.findOneAndUpdate({ cpf: cpf }, { $push: { contacts: contactId } },
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
        await this.UserModel.findOneAndUpdate({ cpf: cpf }, { $pull: { contacts: contactId } },
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

    async findContacts(cpf) {
        var result = null
        var error = ''
        await this.UserModel.findOne({ cpf: cpf }, (err, res) => {
            if (err) {
                error = err
                return
            }
        }).populate('contacts').exec((err, res) => {
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

    async addVehicle(cpf, vehicleId) { //Cpf de quem recebe/ _id do veiculo
        var error = ''
        await this.UserModel.findOneAndUpdate({ cpf: cpf }, { $push: { vehicles: vehicleId } },
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
        await this.UserModel.findOneAndUpdate({ cpf: cpf }, { $pull: { vehicles: vehicleId } },
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

    async findVehicles(cpf) {
        var result = null
        var error = ''
        await this.UserModel.findOne({ cpf: cpf }, (err, res) => {
            if (err) {
                error = err
                return
            }
            //Se tirar o exec, retorna apenas os veiculos do usuario
        }).populate('vehicles').exec((err, res) => {
            if (err) {
                error = err
                return
            }
            result = res
        })
        if (result == null) {
            throw new Error(error)
        }
        return result;
    }

    async addRequestRide(cpf, requestRideId) { //Cpf de quem recebe/ _id do pedido de carona
        var error = ''
        await this.UserModel.findOneAndUpdate({ cpf: cpf }, { $push: { requestsRide: requestRideId } },
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
        await this.UserModel.findOneAndUpdate({ cpf: cpf }, { $pull: { requestsRide: requestRideId } },
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

    async findRequestsRide(cpf) {
        var result = null
        var error = ''
        await this.UserModel.findOne({ cpf: cpf }, (err, res) => {
            if (err) {
                error = err
                return
            }
        }).populate('requestsRide', (err, res) => {
            if (err) {
                error = err
                return
            }
            result = res
        })
        if (result == null) {
            throw new Error(error)
        }
        return result;
    }

    async addFavoriteRoute(cpf, favoriteRouteId) { //Cpf de quem recebe/ _id da rota favorita
        var error = ''
        await this.UserModel.findOneAndUpdate({ cpf: cpf }, { $push: { favoriteRoutes: favoriteRouteId } },
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
        await this.UserModel.findOneAndUpdate({ cpf: cpf }, { $pull: { favoriteRoutes: favoriteRouteId } },
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
        var result = null
        var error = ''
        await this.UserModel.findOne({ cpf: cpf }, (err, res) => {
            if (err) {
                error = err
                return
            }
        }).populate('favoriteRoutes', (err, res) => {
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

module.exports = UserRepository