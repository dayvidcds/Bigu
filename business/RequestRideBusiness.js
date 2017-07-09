var RequestRideRepository = require('../persistence/RequestRideRepository')

class RequestRideBusiness {
    constructor(rep) {
        this.repository = rep //new RequestRideRepository(rep)
    }

    async requestRide(user, ride, origin, destination) {
        var result = null
        var error = ""
        try {
            //Se o user for amigo do cara que esta dando carona
            //if (ride.hitchhiker.indexOf(user._id != -1))
            //se a carona que o user está pedindo ainda não está na lista das caronas pedidas
            if (user.requestsRide.indexOf(ride._id) == -1) {
                result = await this.repository.insert({
                    ride: rideId,
                    origin: origin,
                    destination: destination
                })
            }
        } catch (err) {
            error = err
        }
        if (error != "") {
            throw new Error(error)
        }
        return result._id
    }

    async distanceToRoute(rideId, routeOrigin, routeDestination) {

    }




}

module.exports = RequestRideBusiness