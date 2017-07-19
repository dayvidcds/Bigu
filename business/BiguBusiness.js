class BiguBusiness {
    constructor(biRep, uRep) {
        this.repository = biRep
        this.userRep = uRep
    }


    //quem pediu carona entrou
    async start() {

    }

    //quem pediu carona saiu
    async stop() {

    }

    async ckeckin(biguId, userCpf) {
        var user = this.uRep.findByCpf(userCpf)
        this.repository.updateCheckin(biguId, true)
    }

    async ckeckout(biguId, userCpf) {
        var user = this.uRep.findByCpf(userCpf)
        this.repository.updateChecout(biguId, true)
    }

}

module.exports = BiguBusiness