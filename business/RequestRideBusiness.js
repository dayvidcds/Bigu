class RequestRideBusiness {
    constructor(reqRiderep, userRep) {
        this.repository = reqRiderep //new RequestRideRepository(rep)
        this.uRep = userRep
    }

    async requestRide(userCpf, rideId, origin, destination) {
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
            if (user.requestsRide.indexOf(rideId) != -1) {
                throw new Error('Error: user already on this ride')
            }
            requestRideId = await this.repository.insert({
                ride: rideId,
                origin: origin,
                destination: destination
            })
            this.uRep.addRequestRide(userCpf, requestRideId)
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