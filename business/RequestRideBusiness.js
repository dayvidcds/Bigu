class RequestRideBusiness {
    constructor(rep, uRep) {
        this.repository = rep //new RequestRideRepository(rep)
        this.uRep = uRep
    }

    async requestRide(user, ride, origin, destination) {
        var error = ""
        try {
            //Se u usuario bnão for amigo do carona, não será inserido, pois será levantada uma exception
            this.uRep.findContactByCpf(user.cpf, cpfContact)
                //se a carona que o user está pedindo ainda não estA na lista das caronas pedidas
            if (user.requestsRide.indexOf(ride._id) == -1) {
                requestRideId = await this.repository.insert({
                    ride: rideId,
                    origin: origin,
                    destination: destination
                })

                this.uRep.addRequestRide(user.cpf, requestRideId)
            } else {
                error = 'Usuario ja pediu essa carona'
            }
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