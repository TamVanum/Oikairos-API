const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');

// Simulate a device publishing data
const deviceId = 'pkmByhNgwBNbOLRLzBrC';

// Helper function to generate random values within a range
const getRandomInRange = (min, max, decimals = 2) => {
    const factor = Math.pow(10, decimals);
    return (Math.random() * (max - min) + min).toFixed(decimals);
};

client.on('connect', () => {
    console.log(`ESP8266 ${deviceId} connected to MQTT broker`);
    
    // Publish data periodically
    setInterval(() => {
        const data = JSON.stringify({
            water_flow: Math.random() >= 0.05, // 95% chance of water flow being "true" (active)
            water_temperature: getRandomInRange(18, 24), // Water temperature range 18-24°C
            ambient_temperature: getRandomInRange(20, 35), // Ambient temperature range 20-35°C
            ph_level: getRandomInRange(5.5, 6.5), // Ideal pH level for hydroponics is 5.5-6.5
            electrical_conductivity: getRandomInRange(700, 1200, 0), // Conductivity in μS/cm, typical range 700-1200 μS/cm
            timestamp: new Date().toISOString()
        });

        client.publish(`esp8266/${deviceId}/data`, data);
        console.log(`Published data from ${deviceId}: ${data}`);
    }, 5000);
});
