var distance = require('google-distance');

var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCa8XDxDNKgcqOPbhIUYB2qXXvNSDNItQE'
}); // geocode funciona com static maps, por isso precisa passar a chave

class RouteBusiness {
    constructor(routeRepository, rideRepository) {
        this.routeRepository = routeRepository
        this.rideRepository = rideRepository
        this.origin = null
        this.destination = null
    }

    async checkIntersectionOfRoute(routeA, routeB) {
        // checar pela API
        return true
    }

    async getDistance() {
        distance.get({
            origin: this.origin,
            destination: this.destination,
        }, (err, res) => {
            if (err) { return console.log(err) }
            //console.log(res)
            return res.distance
        })

    }

    async getLatLng(param) { // nome da rua, cidade, estado
        googleMapsClient.geocode({
            address: param
        }, (err, response) => {
            if (!err) {
                return response.json.results[0].geometry.location
            }
            console.log(err)
        });
    }

    async insert(origin, destination) {
        if (origin == null) throw new Error('Origin is null')
        if (destination == null) throw new Error('Destination is null')

        this.origin = origin
        this.destination = destination

        var latLngOrigin = await getLatLng(origin)
        var latLngDestination = await getLatLng(destination)

        await this.routeRepository.insert({
            origin: latLngOrigin,
            destination: latLngDestination
        })

    }

    async findAll() {
        var result = null
        result = await this.routeRepository.findAll()
        return result
    }

    async findByCPF(cpf) {
        var result
        result = await this.routeRepository.findFriendsRoutes(cpf)
        return result
    }

}

module.exports = RouteBusiness