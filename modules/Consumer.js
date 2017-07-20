var amqp = require('amqplib')

class Consumer {
    constructor() {
        this.connection = null
    }
    async start(queue, callback) {
        var url = 'amqp://localhost'
        amqp.connect(url, { userId: 2 }).then((conn) => {
            this.connection = conn
            return conn.createChannel()
        }).then((channel) => {
            channel.prefetch(1, true) //numero  de elementos recebidos por vez
            console.log('RABBIT CONNECTION (SUCESS)')
            setInterval(() => {
                channel.consume(queue, (msg) => {
                    var data = JSON.parse(msg.content.toString());
                    //console.log(' Nome: %s idade: %i id: %i', data.nome, data.idade, data.id);
                    callback(data)
                    channel.ack(msg);
                });
            }, 1000);
        }).error((error) => {
            console.log('RABBIT CONNECTION (ERROR)')
        })
    }

    disconnect() {
        setTimeout(function() {
            this.connection.close();
            console.log('rabbit disconected')
        }, 500);
    }
}

module.exports = Consumer