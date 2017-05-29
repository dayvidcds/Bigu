class ReservaCarona {

    constructor(carona, origem, destino, startTime) {
        this._carona = carona;
        this._origem = origem;
        this._destino = destino;
        this._startTime = startTime;
        this._endTime;
        this._distanciaAteRota;
    }

    get carona() {
        return this._carona;
    }

    get origem() {
        return this._origem;
    }

    get destino() {
        return this._destino;
    }

    get startTime() {
        return this._startTime;
    }

    get endTime() {
        return this._endTime;
    }

    get distanciaAteRota() {
        return this._distanciaAteRota;
    }

    set carona(c) {
        this._carona = c;
    }

    set origem(o) {
        this._origem = o;
    }

    set destino(d) {
        this._destino = d;
    }

    set startTime(s) {
        this._startTime = s;
    }

    set endTime(e) {
        this._endTime = e;
    }

    set distanciaAteRota(d) {
        this._distanciaAteRota = d;
    }
}

module.exports = ReservaCarona;