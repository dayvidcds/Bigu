var mongoose = require('mongoose')

class CheckPointRepository {
    constructor(connection) {
        this.connection = connection
        this.Schema = new mongoose.Schema({
            timestamp: Date,
            position: { latitude: Number, longitude: Number }
        })
        this.CheckPointModel = this.connection.model('CheckPoint', this.Schema)
    }

    async insert(checkPoint) {
        var error = ''
        await this.CheckPointModel.insert(checkPoint,
            (err, res) => {
                error = err

            })
    }


}