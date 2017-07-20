var distance = require('google-distance');

class BiguBusiness {
    constructor(biRep, uRep, reRiRep, riRep, roRep, chkRep) {
        this.repository = biRep
        this.userRep = uRep
        this.reqRideRep = reRiRep
        this.rideRep = riRep
        this.routeRep = roRep
        this.checkRep = chkRep
    }

    async getDistance(or, de) {
        return new Promise((resolve, reject) => {
            distance.get({
                origin: or,
                destination: de,
            }, (err, res) => {
                //console.log('RESSSSSSSSSSS' + res)
                resolve(res.distanceValue)
            })
        })
    }

    //quem pediu carona entrou
    async enter(biguId, location) {
        return new Promise((resolve, reject) => {
            this.repository.findById(biguId).then((bigu) => {
                console.log('entrou em bigu ' + bigu._id)
                console.log(bigu.reservation)
                this.reqRideRep.findById(bigu.reservation).then((res) => {
                    console.log('entrou request ride rep ' + res._id)
                    if ((res.origin.latitude == location.latitude) && (res.origin.longitude == location.longitude)) {
                        console.log('locais iguais')
                        this.rideRep.findById(bigu.ride).then((ride) => {
                            console.log('Entrou em ride rep ' + ride._id)
                            this.routeRep.findById(ride.route).then((route) => {
                                console.log('Entrou em route rep ' + route._id)
                                this.checkRep.findById(route.checkpointOwner).then((check) => {
                                    console.log('Entrou em check rep ' + ride._id)
                                    var pointO = '' + check.position.latitude + ',' + check.position.longitude + ''
                                    var pointD = '' + location.latitude + ',' + location.longitude + ''

                                    console.log('o ' + pointO)
                                    console.log('d ' + pointD)

                                    this.getDistance(pointO, pointD).then((dist) => {
                                        console.log("DISTANCIA: " + dist)
                                        if (dist <= 100) {
                                            this.repository.updateCheckin(bigu.id, true)
                                            this.reqRideRep.setStartTimeById(bigu.reservation, Date.now())
                                            resolve('ENTROU. OK, distancia = ' + dist)
                                        } else {
                                            resolve('MUITO DISTANTE. ERR , distancia = ' + dist)
                                        }
                                    })
                                })
                            })
                        })
                    } else {
                        resolve('NAO ESTA NO PONTO DE ENCONTRO. ERR')
                    }
                })


            })
        })
    }

    //quem pediu carona saiu
    async exit(biguId) {
        return new Promise((resolve, reject) => {
            console.log('saindo da carona')
            this.repository.updateCheckout(biguId, true)
            this.repository.findById(biguId).then((bigu) => {
                console.log('atualizando horario de saida')
                this.reqRideRep.setEndTimeById(bigu.reservation, Date.now())
                console.log('mudando ride mode do user para false')
                this.userRep.setRideMode(bigu.user, false)
                console.log('adicionando carona recebida ao user')
                this.userRep.addReceivedRide(bigu.user, biguId)
                console.log('removendo pedido de carona do user')
                this.userRep.removeRequestRide(bigu.user, bigu.reservation)
                resolve('SAIU. OK')
            })
        })
    }
}

module.exports = BiguBusiness