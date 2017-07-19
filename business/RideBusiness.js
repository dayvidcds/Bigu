class RideBusiness {
    /*user: String,
    hitchhikers: [String],
    start: Date, // start time
    end: Date,
    route: mongoose.Schema.Types.ObjectId,
    availableSpaces: Number,
    vehicle: mongoose.Schema.Types.ObjectId*/

    constructor(riRep, uRep) {
        this.repository = riRep
        this.userRep = uRep
    }

    async givenRide(cpf, routeId, availableSpaces, vehiclePlate) {
        var error = ''
        try {
            userRep.findByCpf(cpf).then((user) => {
                if (user.vehicles.indexOf(vehiclePlate) == -1) {
                    error = 'User can\'t have this vehicle'
                } else {
                    //Se o user já estiver dando ou recebendo carona
                    if (user.rideMode == false) {
                        this.repository.insert({
                            user: cpf,
                            route: routeId,
                            availableSpaces: availableSpaces,
                            vehicle: vehiclePlate
                        })
                        this.userRep.setRideMode(true)
                    } else {
                        error = "user already in giving ride or in ride"
                    }
                }
            })
        } catch (err) {
            error = err
        }
        if (error != '') {
            throw new Error(error)
        }
    }
}
module.exports = RideBusiness