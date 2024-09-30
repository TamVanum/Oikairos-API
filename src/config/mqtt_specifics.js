const {db} = require('../config/firebase.js');

async function handleHydroponicSubscription(aedes, client, topic) {
    const topicParts = topic.split('/');
    const mainTopic = topicParts[0]; // 'esp8266'
    const hydroponicId = topicParts[1]; // Extract hydroponicId from the topic

    // Ensure it's an 'esp8266' topic and hydroponicId is defined
    if (mainTopic === 'esp8266' && hydroponicId) {
        try {
            const HydroponicInstance = await db.collection('hydroponics').doc(hydroponicId).get();
            const HydroponicData = HydroponicInstance.data();
            if (HydroponicData.active === false) {
                console.log(`Hydroponic ID ${hydroponicId} is not active`);
                return;
            }
            console.log(`Current cycle for hydroponic ID ${hydroponicId}:`, HydroponicData.currentCycle);

            const message = {
                topic: topic,
                payload: JSON.stringify({ roomId: HydroponicData.currentCycle }),
                qos: 0,
                retain: false
            };

            // Publish the message to the client
            aedes.publish(message, client, (err) => {
                if (err) {
                    console.error(`Error publishing message to client ${client.id}:`, err);
                } else {
                    console.log(`Message sent to client ${client.id}: roomId: ${message.payload}`);
                }
            });
        } catch (error) {
            console.error(`Error retrieving current cycle for hydroponic ID ${hydroponicId}:`, error);
        }
    } else {
        console.log(`Client ${client.id} subscribed to non-hydroponic topic: ${topic}`);
    }
}

module.exports = handleHydroponicSubscription;