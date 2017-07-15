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
        var error = ''
        try {
            var user = await userRep.findByCpf(cpf)
                //Verificar se o veiculo pertence ao usuario
            if (user.vehicles.indexOf(vehiclePlate) == -1) {
                error = 'User can\'t have this vehicle'
            } else {
                this.rideRep.insert({
                    user: cpf,
                    start: startTime,
                    route: routeId,
                    availableSpaces: availableSpaces,
                    vehicle: vehiclePlate
                })
            }
        } catch (err) {
            error = err
        }
        if (error != '') {
            throw new Error(error)
        }

    }


}