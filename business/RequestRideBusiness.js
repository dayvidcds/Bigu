class RequestRideBusiness {
    constructor(reqRiderep, riRep, userRep, biguRep) {
        this.repository = reqRiderep //new RequestRideRepository(rep)
        this.uRep = userRep
        this.biRep = biguRep
        this.rideRep = riRep
    }

    async requestRide(userCpf, rideId, origin, destination) {
        return new Promise((resolve, reject) => {
            var error = ""
            try {
                this.uRep.findByCpf(userCpf).then((user) => {
                    //Se a carona ja foi dada
                    this.rideRep.findById(rideId).then((ride) => {
                        //CHECAR SE A CARONA JÁ ATINGIU O LIMITE
                        if (ride.availableSpaces > 0) {
                            console.log(ride.user)
                                //se o user for amigo do carona
                            if (user.contacts.indexOf(ride.user) == -1) {
                                resolve('Error: user is not friend of carona owner')
                            }
                            //se a carona que o user está pedindo ainda não estA na lista das caronas pedidas
                            if (user.requestsRide.indexOf(rideId) != -1) {
                                resolve('Error: user already on this ride')
                            }
                            this.repository.insert({
                                ride: rideId,
                                origin: origin,
                                destination: destination
                            }).then((id) => {
                                this.uRep.addRequestRide(userCpf, id)
                                this.rideRep.setavailableSpaces(rideId, ride.availableSpaces - 1)
                                this.biRep.insert({
                                    reservation: id,
                                    ride: rideId,
                                    user: userCpf
                                }).then((biguId) => {
                                    this.rideRep.addHitchhikers(rideId, biguId)
                                    this.biRep.findById(biguId).then((bi) => {
                                        resolve(bi)
                                    })
                                })
                            })
                        } else {
                            resolve('carona sem espaço')
                        }
                    })
                })
            } catch (err) {
                error = err
            }
        })
        if (error != "") {
            throw new Error(error)
        }
    }

    async cancellRequestRide(userCpf, rideId) {
        var error = ""
        try {
            var user = this.uRep.findByCpf(userCpf)
                //Se a carona ja foi dada
            var ride = this.repository.findById(rideId)
                //se o user for amigo do carona
            if (user.contacts.indexOf(ride.user) == -1) {
                throw new Error('Error: user is not friend of carona owner')
            }
            //se a carona que o user está pedindo ainda não estA na lista das caronas pedidas
            if (user.requestsRide.indexOf(rideId) == -1) {
                throw new Error('Error: user is not in this ride')
            }
            this.uRep.removeRequestRide(userCpf, requestRideId)
            this.repository.removeById(rideId)
        } catch (err) {
            error = err
        }
        if (error != "") {
            throw new Error(error)
        }
    }

    async distanceToRoute(rideId, routeOrigin, routeDestination) {

    }
}

module.exports = RequestRideBusiness