class CheckPoint {
    constructor(timeStamp, posicao) {
        this._timeStamp = timeStamp;
        this._posicao = posicao;
    }

    get timeStamp() {
        return this._timeStamp;
    }

    get posicao() {
        return this._posicao;
    }

}

module.exports = CheckPoint;