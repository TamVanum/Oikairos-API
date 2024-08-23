const socketIo = require('socket.io');
const sendMessagesInRooms = require('./services/sockets/sendMessagesInRooms');

function initSocketServer(server) {
    const io = socketIo(server, {
        cors: {
            origin: '*', // Configura según sea necesario
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log(`New client connected: ${socket.id}`);

        // Enviar mensajes en intervalos a las salas, si es necesario
        messageInterval = sendMessagesInRooms(io, socket);
    });

    return io;
}

module.exports = {
    initSocketServer,
};