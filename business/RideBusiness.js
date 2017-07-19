class RideBusiness {
    /*user: String,
    hitchhikers: [String],
    start: Date, // start time
    end: Date,
    route: mongoose.Schema.Types.ObjectId,
    availableSpaces: Number,
    vehicle: mongoose.Schema.Types.ObjectId*/

    constructor(riRep, uRep, roRep) {
        this.repository = riRep
        this.userRep = uRep
        this.routeRep = roRep
    }

    async closeRide(rideId) {

    }

    async findContactsRides(cpf) {
        return new Promise((resolve, reject) => {
            var result = null
            var error = ''
            try {
                this.userRep.findByCpf(cpf).then((user) => {
                    this.userRep.findContactsRides(cpf).then((res) => {
                        if (res == null || res == '') {
                            error = 'without contacts rides'
                            console.log(error)
                        } else {
                            resolve(res)
                        }
                    })
                })
            } catch (err) {
                throw new Error(err)
            }
        })
    }

    async giveRide(cpf, routeId, availableSpaces, vehiclePlate) {
        var error = ''
        try {
            this.userRep.findByCpf(cpf).then((resUser) => {
                if (resUser.vehicles.indexOf(vehiclePlate) == -1) {
                    error = 'User can\'t have this vehicle'
                    console.log(error)
                } else {
                    //Se o user já estiver dando ou recebendo carona
                    if (resUser.rideMode == false) {
                        this.repository.insert({
                            user: cpf,
                            route: null, //COLOCAR ROUTE ID AQUI -------------------------------------------------------------
                            availableSpaces: availableSpaces,
                            vehicle: vehiclePlate
                        }).then((id) => {
                            this.userRep.addGivenRide(cpf, id)
                            this.userRep.setRideMode(cpf, true)
                        })

                    } else {
                        error = "user already in giving ride or in ride"
                        console.log(error)
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