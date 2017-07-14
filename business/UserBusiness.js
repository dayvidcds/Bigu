class UserBusiness {
    constructor(rep) {
        this.repository = rep;
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

    async acceptContact(userCpf, contactCpf) {
        var contact = null
        var error = ''
        try {
            await this.repository.findByCpf(userCpf)
            contact = await this.repository.findByCpf(contactCpf)
            await this.repository.addContact(contact.id)
        } catch (err) {
            error = err
        }
        if (error != '') {
            throw new Error(error)
        }
    }

    async insert(user) {
        var userExist = false
        try {
            this.checkUser(user)
            this.checkCpf(user.cpf)
            this.checkName(user.name)
        } catch (error) {
            throw new Error(error)
        }
        try {
            await this.repository.findByCpf(user.cpf)
            userExist = true
        } catch (error) {}
        if (userExist == false) {
            await this.repository.insert(user);
        } else {
            throw new Error('User already registered')
        }
    }

    async addVehicle(cpf, plate) {
        try {
            await this.repository.findByCpf(cpf)
            await this.repository.addVehicle(cpf, plate)
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

        /*
        
                            var usreExist = false
                            try {
                                this.checkCpf(cpf)
                                this.repository.findByCpf(cpf)
                                this.repository.findContacts(cpf,
                                    (res) => {
                                        callback(res)
                                    })
                            } catch (error) {
                                throw new Error(error)
                 */
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