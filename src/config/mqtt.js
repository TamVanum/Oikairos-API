const aedes = require('aedes')();
const net = require('net');
const { db } = require('./firebase');
const admin = require('firebase-admin');
const MQTT_BROKER_PORT = process.env.MQTT_BROKER_PORT || 1883;
const handleHydroponicSubscription = require('./mqtt_specifics');

let brokerInstance;

function initMQTTBroker(server, io) {
    const mqttServer = net.createServer(aedes.handle);
    mqttServer.listen(MQTT_BROKER_PORT, () => {
        console.log(`MQTT Broker is running on port ${MQTT_BROKER_PORT}`);
    });

    brokerInstance = aedes;

    aedes.on('client', (client) => {
        console.log(`Client connected: ${client.id}`);
    });

    aedes.on('subscribe', (subscriptions, client) => {
        subscriptions.forEach((subscription) => {
            const topic = subscription.topic;
            console.log(`Client ${client.id} subscribed to topic: ${topic}`);

            handleHydroponicSubscription(aedes, client, topic);
        });
    });



    aedes.on('clientDisconnect', (client) => {
        console.log(`Client disconnected: ${client.id}`);
    });

    aedes.on('publish', async (packet, client) => {
        if (client) {
            const topic = packet.topic;

            const payload = JSON.parse(packet.payload.toString());
            payload.timestamp = new Date().toISOString();
            packet.payload = Buffer.from(JSON.stringify(payload));

            const message = packet.payload.toString();
            const roomId = topic.split('/')[1];

            console.log(`Message from client ${client.id} on topic ${topic}: ${message}`);

            io.to(roomId).emit('message', {
                topic,
                message: JSON.parse(message),
                timestamp: new Date(),
            });
            console.log(`Message sent to room ${roomId}`);

            try {
                await db.collection('plantHistory').doc(roomId).set({
                    plantHistory: admin.firestore.FieldValue.arrayUnion(JSON.parse(message))
                }, { merge: true });
                console.log(`Plant history updated in Firestore for room ${roomId}`);
            } catch (error) {
                console.error(`Error updating plant history in Firestore: ${error}`);
            }
        }
    });
}

function getMQTTBrokerInstance() {
    if (!brokerInstance) {
        throw new Error('MQTT broker not initialized. Call initMQTTBroker first.');
    }
    return brokerInstance;
}

module.exports = {
    initMQTTBroker,
    getMQTTBrokerInstance,
};
