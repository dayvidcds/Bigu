class NegociosUsuario {
    constructor(rep) {
        this.repositorio = rep;
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