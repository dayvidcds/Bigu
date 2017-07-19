var mongoose = require('mongoose')
var VechicleRepository = require('./VehicleRepository')
var RideRepository = require('./RideRepository')
var RouteRepository = require('./RouteRepository');

class UserRepository {
    constructor(connection) {
        this.connection = connection
        this.schema = new mongoose.Schema({
            cpf: String,
            name: String,
            points: Number,
            vehicles: [String],
            contacts: [String],
            requestsRide: [mongoose.Schema.Types.ObjectId],
            favoriteRoutes: [mongoose.Schema.Types.ObjectId],
            givenRides: [mongoose.Schema.Types.ObjectId],
            receivedRides: [mongoose.Schema.Types.ObjectId], //Bigus
            rideMode: Boolean
        })
        this.userModel = this.connection.model('User', this.schema)
    }

    async setRideMode(cpf, mode) {
        //return Promise.all()
        var error = ''
        var userRep = new this.userModel(user)
        await userRep.findOneAndUpdate({ cpf: cpf }, { $set: { rideMode: mode } },
            (err, res) => {
                if (err) {
                    error = err
                }
            })
        if (error != '') {
            throw new Error(error)
        }
    }

    async insert(user) {
        //return new Promise((resolve, reject) => {
        var error = ''
        var userRep = new this.userModel(user);
        //await
        await userRep.save((err, res) => {
            if (err) {
                error = err
            }
            //resolve(res)
        })
        if (error !== '') {
            throw new Error(error)
        }
        //})
        //})
    }

    async remove(cpf) {
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
        return new Promise((resolve, reject) => {
            var error = ''
            var result = null
            this.userModel.findOne({ cpf: cpf }, (err, res) => {
                if (err || (res == null)) {
                    error = err
                    reject(err)
                }
                resolve(res)
            })
        })

    }

    async findAll() {
        return new Promise((resolve, reject) => {
            var result = null
            var error = ''
            this.userModel.find((err, res) => {
                if (err) {
                    error = err
                    return
                }
                resolve(res)
                    //result = res
            })
            if (error != '') {
                reject(error)
                    //throw new Error(error)
            }
            //return result	
        });
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

    async findGivenRides(cpf) {
        return new Promise((resolve, reject) => {
            this.userModel.aggregate([{
                        $match: {
                            cpf: cpf
                        }
                    },
                    {
                        $lookup: {
                            from: "rides",
                            localField: "givenRides",
                            foreignField: "_id",
                            as: "given_rides_full"
                        }
                    }
                ],
                function(err, res) {
                    if (err) {
                        reject(err)
                        return
                    }
                    resolve(res)
                }
            )
        })
    }

    async addGivenRide(cpf, rideId) { //Cpf de quem recebe/ cpf do contato
        var error = ''
        await this.userModel.findOneAndUpdate({ cpf: cpf }, { $push: { givenRides: rideId } },
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

    async removeGivenRide(cpf, rideId) { //Cpf de quem recebe/ _id do contato
        var error = ''
        await this.userModel.findOneAndUpdate({ cpf: cpf }, { $pull: { givenRides: rideId } },
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

    async addReceivedRide(cpf, biguId) { //Cpf de quem recebe/ cpf do contato
        var error = ''
        await this.userModel.findOneAndUpdate({ cpf: cpf }, { $push: { receivedRides: biguId } },
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

    async removeReceivedRide(cpf, biguId) { //Cpf de quem recebe/ _id do contato
        var error = ''
        await this.userModel.findOneAndUpdate({ cpf: cpf }, { $pull: { receivedRides: biguId } },
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


    async addContact(cpf, contactCpf) { //Cpf de quem recebe/ cpf do contato
        var error = ''
        await this.userModel.findOneAndUpdate({ cpf: cpf }, { $push: { contacts: contactCpf } },
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

    async removeContact(cpf, contactCpf) { //Cpf de quem recebe/ _id do contato
        var error = ''
        await this.userModel.findOneAndUpdate({ cpf: cpf }, { $pull: { contacts: contactCpf } },
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
        return new Promise((resolve, reject) => {
            var error = ''
            this.userModel.aggregate([{
                            $match: {
                                cpf: cpf
                            }
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "contacts",
                                foreignField: "cpf",
                                as: "users_full"
                            }
                        }
                    ],
                    (err, res) => {
                        if (err) {
                            reject(err)
                        }
                        resolve(res)
                    }
                )
                /*
                            if (error !== '') {
                                throw new Error(error)
                            }*/
        })

        //return result
    }


    async findContactByCpf(cpfUser, cpfContact) {
        return new Promise((resolve, reject) => {
            var error = ''
            this.userModel.aggregate({
                        $match: {
                            cpf: cpfUser
                        }
                    }, {
                        $lookup: {
                            from: "users",
                            localField: "contacts",
                            foreignField: "cpf",
                            as: "users_full"
                        }
                    }, {
                        $match: {
                            "users_full.cpf": cpfContact
                        }
                    },
                    (err, res) => {
                        if (err) {
                            reject(err)
                        }
                        if (res == '') {
                            reject('Nao eh amigo do carona')
                        }
                        resolve(res)
                    }
                )
                /*
                            if (error !== '') {
                                throw new Error(error)
                            }*/
        })

        //return result
    }


    async addVehicle(cpf, plate) { //Cpf de quem recebe/ _id do veiculo
        var error = ''
        await this.userModel.findOneAndUpdate({ cpf: cpf }, { $push: { vehicles: plate } },
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

    async removeVehicle(cpf, plate) { //Cpf de quem recebe/ _id do veiculo
        var error = ''
        await this.userModel.findOneAndUpdate({ cpf: cpf }, { $pull: { vehicles: plate } },
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
        await this.userModel.find({ cpf: cpf }, (err, res) => {
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

    async findRequestsRide(cpf) {
        return new Promise((resolve, reject) => {
            this.userModel.aggregate([{
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
                        reject(err)
                    }
                    resolve(res)
                }
            )
        })
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
        return new Promise((resolve, reject) => {
            this.userModel.aggregate([{
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
                        reject(err)
                    }
                    resolve(res)
                }
            )
        })
    }
}
module.exports = UserRepository