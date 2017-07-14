class RideBusiness {
    /*user: String,
    hitchhikers: [String],
    start: Date, // start time
    end: Date,
    route: mongoose.Schema.Types.ObjectId,
    availableSpaces: Number,
    vehicle: mongoose.Schema.Types.ObjectId*/

    constructor(riRep, roRep, veRep, uRep) {
        this.rideRep = riRep
        this.routeRep = roRep
        this.vehicleRep = veRep
        this.userRep = uRep
    }

    async givenRide(cpf, routeId, startTime, availableSpaces, vehiclePlate) {








        var error = '';
        try {
            var userVehicles = uRep.findVehicles(cpf)
            var userGivenRides = riRep
                //Verificar se o veiculo pertence ao usuario
            if (userVehicles.indexOf(vehiclePlate) != -1) {
                this.rideRep.insert({
                    user: cpf,
                    start: startTime,
                    route: routeId,
                    availableSpaces: availableSpaces,
                    //vehicle = userVehicles.
                })
            } else {
                error = 'User can\'t have this vehicle'
            }
        } catch (err) {
            error = err
        }
        if (error != '') {
            throw new Error(error)
        }

    }


}