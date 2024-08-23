const http = require('http');
const app = require('./app');
const { initMQTTBroker } = require('./config/mqtt');
const { initSocketServer } = require('./socketServer');

const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = initSocketServer(server);

initMQTTBroker(server, io);

server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/api`);
});