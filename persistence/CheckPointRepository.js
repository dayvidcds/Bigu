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

    async getCheckPoint(chkId) {
        var error = ''
        var result = null
        await this.checkPointModel.findOne({ _id: chkId },
            (err, res) => {
                if (err) {
                    error = err
                }
                result = res
            })

        if (result == null) {
            throw new Error(error)
        }
        return result
    }

    async getAllCheckPoints() {
        var error = ''
        var result = null
        await this.checkPointModel.find(
            (err, res) => {
                if (err) {
                    error = err
                }
                result = res
            })

        if (result == null) {
            throw new Error(error)
        }
        return result
    }

}
module.exports = CheckPointRepository