class RouteBusiness {

    constructor(routeRep, rideRep) {
        this.routeRepository = routeRep
        this.rideRepository = rideRep
    }

   async insert(route) {
        var rideExist = true

        if (route.ride == null) throw new Error('Null ride')
        if (route.origin == null) throw new Error('Null origin')
        if (route.destination == null) throw new Error('Null destination')

        try {
            await this.rideRepository.findByCpf(route.cpf)
            rideExist = false
        } catch (error) {}

        if (rideExist == true) {
            await this.routeRepository.insert(route)
        } else {
            throw new Error('Ride does not exist')
        }

    }

    async findFriendsRoutes(cpf) {
        if (cpf == null) throw new Error('Null CPF')

        try {
            await this.routeRepository.findFriendsRoutes(cpf)
        } catch (error) {}

    }

    async remove(id) {
        if (id == null) throw new Error('Null id')

        try {
            await this.routeRepository.remove(id)
        } catch(error) {}

    }

}