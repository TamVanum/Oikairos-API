const { db } = require('../config/firebase');

// Handle messages from devices
function handleDeviceMessage(topic, message) {
    const messageStr = message.toString();
    console.log(`Received message on topic ${topic}: ${messageStr}`);

    // Example: Parse the message and save to Firestore
    const parsedMessage = JSON.parse(messageStr);
    const deviceId = parsedMessage.deviceId;
    const data = parsedMessage.data;

    db.collection('devices').doc(deviceId).collection('data').add({
        data,
        timestamp: new Date(),
        topic,
    }).then(() => {
        console.log('Data saved successfully');
    }).catch((error) => {
        console.error('Error saving data:', error);
    });

    // Further processing logic can be added here, like triggering other events
}

module.exports = {
    handleDeviceMessage,
};