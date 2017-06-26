class UserBusiness {
    constructor(rep) {
        this.repository = rep;
    }

    checkUserData(user) {
        if (user == null) throw new Error('Null user')
        if (user.cpf == null) throw new Error('Null CPF')
        if (user.name == null) throw new Error('Null name')
    }

    async insert(user) {
        var userExist = false
        try {
            checkUserData(user)
        } catch (error) {
            throw new Error(error)
        }
        try {
            await this.repository.findByCpf(user.cpf)
            userExist = true
        } catch (error) {}
        if (userExist == false) {
            this.repositorio.inserir(usuario);
        } else {
            throw new Error('User already registered')
        }
    }

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