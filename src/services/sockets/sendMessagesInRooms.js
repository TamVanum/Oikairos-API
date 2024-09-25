function sendMessagesInRooms(io, socket) {
    let roomId;
    let messageInterval;

    socket.on('joinRoom', (room) => {
        roomId = room;
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);

        socket.emit('message', `Welcome to room ${roomId} - Socket ${socket.id}`);
    });

    socket.on('sendMessageToRoom', ({ roomId, message }) => {
        console.log(`Message to room ${roomId}: ${message}`);
        io.to(roomId).emit('message', message, `Socket ${socket.id}`);
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        if (messageInterval) clearInterval(messageInterval);
    });
}

module.exports = sendMessagesInRooms;