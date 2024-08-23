function sendMessagesInRooms(io, socket) {
    let roomId;
    let messageInterval;

    // Listen for a join room event
    socket.on('joinRoom', (room) => {
        roomId = room;
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);

        // Optionally, send a welcome message or load initial data
        socket.emit('message', `Welcome to room ${roomId} - Socket ${socket.id}`);

        // Start sending messages to this specific room at regular intervals
        messageInterval = setInterval(() => {
            const message = `Periodic update for room ${roomId} - Time: ${new Date().toLocaleTimeString()}`;
            console.log(`Sending to room ${roomId}: ${message}`);
            io.to(roomId).emit('message', message, `Socket ${socket.id}`);
        }, 5000); // Adjust interval as needed
    });

    // Handle sending messages to a specific room
    socket.on('sendMessageToRoom', ({ roomId, message }) => {
        console.log(`Message to room ${roomId}: ${message}`);
        io.to(roomId).emit('message', message, `Socket ${socket.id}`);
    });

    // Handle client disconnect
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        if (messageInterval) clearInterval(messageInterval); // Stop sending messages when client disconnects
    });
}

module.exports = sendMessagesInRooms;