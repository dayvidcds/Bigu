var mongoose = require('mongoose');
var db_config = require('../config/db.json');
mongoose.Promise = global.Promise;
var mongoConn; //{}

(() => {
    var url;
    url = 'mongodb://' + db_config.endereco + ':' + db_config.porta + '/' + db_config.db;

    mongoConn = mongoose.connect(url, (err, res) => {
        if (err) {
            console.log('ERRO');
        } else {
            console.log('Sucesso');
        }
    });
})();

module.exports = mongoConn;