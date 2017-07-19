class BiguBusiness {
    constructor(biRep, uRep, reRiRep) {
        this.repository = biRep
        this.userRep = uRep
        this.reqRideRep = reRiRep
    }

    //quem pediu carona entrou
    async start(biguId) {
        var user = this.uRep.findByCpf(userCpf)
        this.repository.updateCheckin(biguId, true)
    }

    //quem pediu carona saiu
    async exit(biguId) {
        return new Promise((resolve, reject) => {
            console.log('saindo da carona')
            this.repository.updateCheckout(biguId, true)
            this.repository.findById(biguId).then((bigu) => {
                console.log('atualizando horario de saida')
                this.reqRideRep.setEndTimeById(bigu.ride, Date.now())
                console.log('mudando ride mode do user para false')
                this.userRep.setRideMode(bigu.user, false)
                console.log('adicionando carona recebida ao user')
                this.userRep.addReceivedRide(bigu.user, biguId)
                console.log('removendo pedido de carona do user')
                this.userRep.removeRequestRide(bigu.user, bigu.reservation)
                resolve('OK. SAIU')
            })
        })
    }
}

module.exports = BiguBusiness