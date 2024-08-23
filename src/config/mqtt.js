const aedes = require('aedes')();
const net = require('net');

const MQTT_BROKER_PORT = process.env.MQTT_BROKER_PORT || 1883;


function initMQTTBroker(server, io) {
    const mqttServer = net.createServer(aedes.handle);
    mqttServer.listen(MQTT_BROKER_PORT, () => {
        console.log(`MQTT Broker is running on port ${MQTT_BROKER_PORT}`);
    });


    aedes.on('client', (client) => {
        console.log(`Client connected: ${client.id}`);
    });

    aedes.on('clientDisconnect', (client) => {
        console.log(`Client disconnected: ${client.id}`);
    });

    aedes.on('publish', (packet, client) => {
        if (client) {
            const topic = packet.topic;
            const message = packet.payload.toString();
            const roomId = topic.split('/')[1]; // Extract roomId from the topic

            console.log(`Message from client ${client.id} on topic ${topic}: ${message}`);

            // Emit the message to the corresponding WebSocket room
            io.to(roomId).emit('message', {
                topic,
                message: JSON.parse(message), // Assuming the message is JSON
                timestamp: new Date(),
            });
            // io.to(roomId).emit('message', "Desde Mqtt");
            console.log(`Message sent to room ${roomId}`);
        }
    });
}

module.exports = {
    initMQTTBroker,
};
// // Initialize MQTT Client (optional, if you need to connect to another broker)
// function initMQTTClient() {
//     const client = mqtt.connect(process.env.MQTT_BROKER_URL);

//     client.on('connect', () => {
//         console.log('Connected to MQTT broker');
//         client.subscribe('esp8266/+/data', (err) => {
//             if (!err) {
//                 console.log('Subscribed to ESP8266 data topics');
//             }
//         });
//     });

//     client.on('message', (topic, message) => {
//         console.log(`Received message on topic ${topic}: ${message.toString()}`);

//         // Extract data from the message
//         const data = JSON.parse(message.toString());

//         // Emit data via WebSocket
//         const roomId = topic.split('/')[1]; // Assuming roomId is the second part of the topic
//         socket.emit('sendMessageToRoom', { roomId, message: data });
//     });

//     return client;
// }
