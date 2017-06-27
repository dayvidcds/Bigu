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

    async findAllContacts(cpf) {
        var result = null
        try {
            this.checkCpf(cpf)
            await this.repository.findContacts(cpf,
                (res) => {
                    result = res
                    console.log('mudei res' + res)
                })
            console.log('passei o callback')
        } catch (error) {
            throw new Error(error)
        }
        return result
    }

    //VERIFICAR FUNCIONALIDADE DISSO
    async setRideMode(cpf) {
        if (cpf != null) {
            var user
            try {
                user = await this.repository.findByCpf(cpf);
            } catch (error) {
                throw new Error('User not registered')
            }
        }
    }
}
module.exports = UserBusiness