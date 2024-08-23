const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');

// Simulate a device publishing data
const deviceId = 'device1';

client.on('connect', () => {
    console.log(`ESP8266 ${deviceId} connected to MQTT broker`);
    
    // Publish data periodically
    setInterval(() => {
        const data = JSON.stringify({
            temperature: (Math.random() * 10 + 20).toFixed(2),
            humidity: (Math.random() * 20 + 40).toFixed(2),
            timestamp: new Date().toISOString()
        });

        client.publish(`esp8266/${deviceId}/data`, data);
        console.log(`Published data from ${deviceId}: ${data}`);
    }, 5000); // Publish data every 5 seconds
});