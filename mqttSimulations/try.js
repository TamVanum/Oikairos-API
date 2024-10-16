const mqtt = require('mqtt');

// Conectar al broker MQTT
const client = mqtt.connect('mqtt://192.168.1.170:1883');

// Función para enviar el roomId al ESP8266
function sendRoomId(deviceId, roomId) {
    // Esperar a que el cliente se conecte
    client.on('connect', () => {
        console.log(`Connected to MQTT broker, sending roomId ${roomId} to device ${deviceId}`);
        
        // Crear el payload JSON
        const data = JSON.stringify({ roomId });
        
        // Publicar el roomId en el tópico de configuración del ESP8266
        client.publish(`esp8266/${deviceId}/setup`, data);
        console.log(`Published roomId ${roomId} to device ${deviceId}`);
    });
}

// Ejemplo de uso
sendRoomId('pkmByhNgwBNbOLRLzBrC', ''); 