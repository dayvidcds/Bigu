class Bigu {
    constructor(reserva, carona, usuario) {
        this._checkin = false;
        this._checkout = false;
        this._reserva = reserva;
        this._carona = carona;
        this._usuario = usuario;
    }
}
module.exports = Bigu;