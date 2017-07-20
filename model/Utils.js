module.exports = {
    strToJson: function(str) {
        return JSON.parse(str);
    },

    objToJson: function(obj) {
        return JSON.stringify(obj);
    }
}