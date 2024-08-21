const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const mqtt = require('mqtt');

// Configuración de MQTT
const protocol = 'mqtts'
const host = 'deb81111.ala.us-east-1.emqxsl.com'
const port = '8883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `${protocol}://${host}:${port}`

const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: '',
    password: '',
    reconnectPeriod: 1000,
});


// Conectar y suscribirse a un tema MQTT
client.on('connect', () => {
    console.log('Connected to MQTT broker');

    // Suscripción a un tema
    const topic = '/nodejs/mqtt';
    client.subscribe(topic, (err) => {
        if (err) {
            console.error(`Failed to subscribe to topic '${topic}':`, err);
        } else {
            console.log(`Subscribed to topic '${topic}'`);
        }
    });
    client.subscribe('/nodejs/mqtt2', (err) => {
        if (err) {
            console.error(`Failed to subscribe to topic '${topic}':`, err);
        } else {
            console.log(`Subscribed to topic '${topic}'`);
        }
    });
    client.subscribe('/nodejs/mqtt3', (err) => {
        if (err) {
            console.error(`Failed to subscribe to topic '${topic}':`, err);
        } else {
            console.log(`Subscribed to topic '${topic}'`);
        }
    });
});

// Manejo de mensajes recibidos desde MQTT
client.on('message', (topic, message) => {
    const msg = message.toString(); // Convertir el mensaje de Buffer a string
    console.log(`Received message: ${msg} on topic: ${topic}`);

    // Aquí podrías realizar alguna acción con el mensaje, por ejemplo, emitirlo a través de WebSocket
    // io.emit('mqttMessage', { topic, message: msg });
});

client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
})

// Configuración de Express y Socket.io
const indexRouter = require('./routes/index.js');
const usersRouter = require('./routes/users.js');
const userIntentsRouter = require('./routes/userIntents.js');
const plansRouter = require('./routes/plans.js');
const authRoutes = require('./routes/auth.js');
// const authMiddleware = require('./middlewares/firebaseJwtAuth.js');

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/usersIntents', userIntentsRouter);
app.use('/api/plans', plansRouter);
app.use('/auth', authRoutes);

// Manejo de conexiones WebSocket
// io.on('connection', (socket) => {
//     console.log('a user connected');

//     socket.on('message', (msg) => {
//         console.log('message: ' + msg);
//         socket.broadcast.emit('message', msg);
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });
// });

// app.use(authMiddleware);

module.exports = server;