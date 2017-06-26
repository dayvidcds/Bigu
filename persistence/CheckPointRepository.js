var mongoose = require('mongoose')

class CheckPointRepository {
    constructor(connection) {
        this.connection = connection
        this.Schema = new mongoose.Schema({
            timestamp: Date,
            position: { latitude: Number, longitude: Number }
        })
        this.checkPointModel = this.connection.model('CheckPoint', this.Schema)
    }

    async insert(checkPoint) {
        var error = ''
        var checkRep = new this.checkPointModel(checkPoint)
        await this.checkPointModel.save((err, res) => {
            if (err) {
                error = err
                return
            }
        })
        if (error !== '') {
            throw new Error(error)
        }
    }
}
module.exports = CheckPointRepository