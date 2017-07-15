var amqp = require('amqplib')

class Producer {
    constructor() {
        this.connection = null
    }

    async start(queue, callback) {
        return new Promise((resove, reject) => {
            var url = 'amqp://localhost'
            amqp.connect(url, { userId: 2 }).then((conn) => {
                this.connection = conn
                return conn.createChannel()
            }).then((channel) => {
                console.log('RABBIT CONNECTION (SUCESS)')
                this.channel = channel
                resove(this)
            }).error((error) => {
                console.log('RABBIT CONNECTION (ERROR)')
            })
        })
    }

    sendToQueue(queue, message) {
        //ch.assertQueue(queue, { durable: true });
        this.channel.sendToQueue(queue, new Buffer(JSON.stringify(message)));
        console.log("Enviado");
    }

    disconnect() {
        setTimeout(function() {
            this.connection.close();
            console.log('rabbit disconected')
        }, 500);
    }
}
module.exports = Producer