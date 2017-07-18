class BiguBusiness {
    constructor(biRep, uRep) {
        this.repository = biRep
        this.userRep = uRep
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