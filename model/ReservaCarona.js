class ReservaCarona {
    constructor(carona, origem, destino, startTime) {
        this._carona = carona;
        this._origem = origem;
        this._destino = destino;
        this._startTime = startTime;
        this._endTime;
        this._distanciaAteRota;
    }
}
module.exports = ReservaCarona;