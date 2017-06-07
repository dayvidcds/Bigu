var mongoose = require('mongoose')

var userModelT = mongoose.model('Usuario', this.schema)

class UserRepository {
    constructor(connection) {
        this.connection = connection
        this.schema = new mongoose.Schema({
            cpf: String,
            name: String,
            points: Number,
            vehicles: [String],
            contacts: [String],
            requestRide: [String]
        })
        this.UserModel = this.connection.model('Usuario', this.schema)
    }

    async insert (user) {
        var error = ''
        var userRep = new this.UserModel(user)
        await userRep.save((err, res) => {
            if (err) {
                error = err
            }
        })
        if (error !== '') {
            throw new Error(error)
        }
    }

    async findByCpf(cpf) {
        var error = "";
        var result = null;
        await userModel.findOne({ cpf: cpf }, (err, res) => {
            if (err) {
                error = err;
                return;
            }
            result = res;

        });
        if (result == null) {
            throw (new Error(error));
        }

    }

    async removeByCpf(cpf) {
        var error = "";
        await this.userModel.findOneAndRemove({ cpf: cpf }, (err, res) => {
            if (err) {
                error = err;
            }
        });
        if (error != "") {
            throw new Error(error);
        }
    }

    async findAll() {
            var result = null;
            var error = "";
            await this.userModel.find((err, res) => {
                if (err) {
                    error = err;
                    return;
                }
                result = res;
            });
            if (result == null) {
                throw new Error(error);
            }
            return result;
        }
        /*
            async findFriends(user) {
                var result = null;
                var error = "";

                await userModelT.fin


            }*/

}

module.exports = UserRepository;