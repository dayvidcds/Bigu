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
            var user = await this.repository.findByCpf(userCpf)
            if (user.contacts.indexOf(contactCpf) == -1) {
                await this.repository.findByCpf(contactCpf)
                await this.repository.addContact(userCpf, contactCpf)
            } else {
                error = "user contact already registered"
            }
        } catch (err) {
            error = err
        }
        if (error != '') {
            throw new Error(error)
        }
    }

    async insert(user) {
        var userExist = true
        try {
            this.checkUser(user)
            this.checkCpf(user.cpf)
            this.checkName(user.name)
            await this.repository.findByCpf(user.cpf)
            userExist = false
        } catch (error) {}
        if (userExist == true) {
            await this.repository.insert(user);
        } else {
            throw new Error('User already registered')
        }
    }

    async remove(cpf) {
        try {
            this.checkUser(cpf)
            await this.repository.findByCpf(cpf)
            await this.repository.remove(cpf);
        } catch (error) {
            console.log(error)
        }
    }

    async addVehicle(cpf, plate) {
        try {
            var user = await this.repository.findByCpf(cpf)
            if (user.vehicles.indexOf(plate) == -1) {
                await this.repository.addVehicle(cpf, plate)
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async removeVehicle(cpf, plate) {
        try {
            var user = await this.repository.findByCpf(cpf)
            if (user.vehicles.indexOf(plate) != -1) {
                await this.repository.removeVehicle(cpf, plate)
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async findAllContacts(cpf) {
        var result = null
        var usreExist = false
        try {
            this.checkCpf(cpf)
            await this.repository.findByCpf(cpf)
            result = await this.repository.findContacts(cpf)
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