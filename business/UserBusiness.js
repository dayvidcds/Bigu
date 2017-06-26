class UserBusiness {
    constructor(rep) {
        this.repository = rep;
    }

    inserir(usuario) {
        //validar primeiro...



        this.repositorio.inserir(usuario);
    }

    async setModoCarona(cpf) {
        var usuario = await this.repositorio.buscarCpf(cpf);
        //...
    }
}