class Bigu {

    constructor(reserva, carona, usuario) {
        this._checkin = false;
        this._checkout = false;
        this._reserva = reserva;
        this._carona = carona;
        this._usuario = usuario;
    }

    get checkin() {
        return this._checkin;
    }

    get checkout() {
        return this._checkout;
    }

    get reserva() {
        return this._reserva;
    }

    get carona() {
        return this._carona;
    }

    get usuario() {
        return this._usuario;
    }

    set usuario(u) {
        this._usuario = u;
    }

    set carona(c) {
        this._carona = c;
    }

    set reserva(r) {
        this._reserva = r;
    }

    fazerCheckin() {
        this._checkin = true;
    }

    fazerCheckout() {
        this._checkout = true;
    }

}

module.exports = Bigu;