var mongoose = require('mongoose')

class BiguRepository {
    constructor(connection) {
        this.connection = connection

        this.Schema = new mongoose.Schema({
            checkin: Boolean,
            checkout: Boolean,
            reservation: { type: mongoose.Schema.Types.ObjectId, ref: 'RequestRide' },
            ride: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride' },
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
        })
        this.BiguModel = this.connection.model('Bigu', this.Schema)

        //CÓDIGO PARA TESTE(ABAIXO)
        this.RideModel = this.connection.model('Ride', { nome: String })
        this.UserModel = this.connection.model('User', { nome: String })
    }

    async insert(bigu) {
        var error = ''
        var biguRep = new this.BiguModel(bigu)

        await biguRep.save(
            (err, res) => {
                if (err) {
                    error = err
                    return
                }
            })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async remove(biguId) {
        var error = ''
        await this.BiguModel.findOneAndRemove({ _id: biguId },
            () => {
                if (err) {
                    error = error
                    return
                }
            })
        if (error !== '') {
            throw new Error(error)
        }
    }

    //Utilizar o cpf como parametro | Mudar a chave primaria de usuario para cpf
    async removeAllFromUser(userId) {
        var error = ''
        await this.BiguModel.remove({ user: userId },
            (err, res) => {
                if (err) {
                    error = err
                    return
                }
            })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async updateCheckin(biguId, state) {
        var error = ''
        await this.BiguModel.findOneAndUpdate({ _id: biguId }, { $set: { checkin: state } },
            (err, res) => {
                if (err) {
                    error = err
                    return
                }
            })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async updateCheckout(biguId, state) {
        var error = ''
        await this.BiguModel.findOneAndUpdate({ _id: biguId }, { $set: { checkout: state } },
            (err, res) => {
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