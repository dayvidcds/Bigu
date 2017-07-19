var distance = require('google-distance');

var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCa8XDxDNKgcqOPbhIUYB2qXXvNSDNItQE'
}); // geocode funciona com static maps, por isso precisa passar a chave

class RouteBusiness {
    constructor(routeRepository, rideRepository) {
        console.log('passou no contr')

        this.routeRepository = routeRepository
        this.rideRepository = rideRepository
    }

    async checkIntersectionOfRoute(routeA, routeB) {
        // checar pela API
        return true
    }

    async getDistance(or, de) {
        return new Promise((resolve, reject) => {
            distance.get({
                origin: or,
                destination: de,
            }, (err, res) => {
                resolve(res.distance)
            })
        })
    }

    async getLatLng(param) { // nome da rua, cidade, estado
        return new Promise((resolve, reject) => {
            googleMapsClient.geocode({
                address: param
            }, (err, response) => {
                resolve(response.json.results[0].geometry.location)
            });
        })
    }

    async insert(origin, destination) {
        if (origin == null) throw new Error('Origin is null')
        if (destination == null) throw new Error('Destination is null')

        return new Promise((resolve, reject) => {
            this.getLatLng(origin).then((ori) => {
                this.getLatLng(destination).then((des) => {
                    console.log('or ' + ori)
                    console.log('des ' + des)
                    this.routeRepository.insert({
                        origin: { latitude: ori.lat, longitude: ori.lng },
                        destination: { latitude: des.lat, longitude: des.lng }
                    }).then((routeId) => {
                        resolve(routeId)
                    })
                })
            })
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