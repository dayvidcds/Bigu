/*
    cpf: String,
    name: String,
    points: Number,
    vehicles: [String],
    contacts: [String],
    requestsRide: [mongoose.Schema.Types.ObjectId],
    favoriteRoutes: [mongoose.Schema.Types.ObjectId],
    givenRides: [mongoose.Schema.Types.ObjectId],
    rideMode: Boolean
*/
class UserBusiness {
    constructor(userRepository) {
        this.repository = userRepository;
    }

    checkCpf(cpf) {
        if (cpf == null) throw new Error('Null CPF')
    }

    checkName(name) {
        if (name == null) throw new Error('Null name')
    }

    checkUser(user) {
        if (user == null) throw new Error('Null user')
    }

    async addContact(userCpf, contactCpf) {
        var contact = null
        var error = ''
        try {
            this.checkCpf(userCpf)
            this.checkCpf(contactCpf)
            this.repository.findByCpf(userCpf).then((res) => {
                console.log(res.contacts)
                if (res.contacts.indexOf(contactCpf) == -1) {
                    this.repository.findByCpf(contactCpf).then((res) => {
                        this.repository.addContact(userCpf, contactCpf)
                    })
                } else {
                    error = "user contact already registered"
                    console.log(error)
                }
            })
        } catch (err) {
            error = err
        }
        if (error != '') {
            throw new Error(error)
        }
    }

    async insert(user) {
        var userExist = false
        var retorno = null
        try {
            this.checkUser(user)
            this.checkCpf(user.cpf)
            this.checkName(user.name)
            this.repository.findByCpf(user.cpf).catch((error) => {
                console.log(error)
                this.repository.insert(user)
            })
        } catch (error) {
            console.log(error)
        }
    }

    async remove(cpf) {
        try {
            this.checkUser(cpf)
            await this.repository.findByCpf(cpf).then((res) => {
                this.repository.remove(cpf)
            })
        } catch (error) {
            console.log(error)
        }
    }

    async addVehicle(cpf, plate) {
        try {
            this.repository.findByCpf(cpf).then((res) => {
                if (res.vehicles.indexOf(plate) == -1) {
                    this.repository.addVehicle(cpf, plate)
                } else {
                    console.log('Veiculo ja eh do usuario')
                }
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    async removeVehicle(cpf, plate) {
        try {
            this.repository.findByCpf(cpf).then((res) => {
                if (res.vehicles.indexOf(plate) != -1) {
                    this.repository.removeVehicle(cpf, plate)
                }
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    async findAllContacts(cpf) {
        var result = null
        var usreExist = false
        try {
            this.checkCpf(cpf)
            await this.repository.findByCpf(cpf).then((res) => {
                result = this.repository.findContacts(cpf)
                return result
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    async findAllUsers() {
        var result = null
        try {
            result = await this.repository.findAll()
        } catch (error) {
            throw new Error(error)
        }
        return result
    }


    async activateRideMode(cpf) {
        try {
            this.checkCpf(cpf)
            await this.repository.findContacts(cpf)
            await this.repository.setRideMode(cpf, true)
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = UserBusiness