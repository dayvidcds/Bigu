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
        return new Promise((resolve, reject) => {
            var error = ''
            var checkRep = new this.checkPointModel(checkPoint)
            checkRep.save((err, res) => {
                if (err) {
                    error = err
                    return
                }
                resolve(res)
                if (error != '') {
                    throw new Error(error)
                }
            })
        })
    }

    async findById(chkId) {
        return new Promise((resolve, reject) => {
            var error = ''
            var result = null
            this.checkPointModel.findOne({ _id: chkId }, (err, res) => {
                if (err) {
                    error = err
                    reject(err)
                }
                if (res == null || res == '') {
                    console.log('chk  not exist')
                    reject('chk not exist')
                } else {
                    //console.log('_' + res + '_')
                    resolve(res)
                }
            })
        })

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