const { db } = require('../../config/firebase');

// Handle WebSocket connection
function handleSocketConnection(socket) {
    // Example: Listen for a custom event from the client
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    // Example: Handle a message event
    socket.on('sendMessage', async (messageData) => {
        const { roomId, message } = messageData;
        console.log(`Received message: ${message} in room: ${roomId}`);

        // Optionally save message to Firestore
        await db.collection('rooms').doc(roomId).collection('messages').add({
            message,
            timestamp: new Date(),
            senderId: socket.id
        });

        // Broadcast the message to everyone in the room
        socket.to(roomId).emit('newMessage', { message, senderId: socket.id });
    });

    // Example: Handle client disconnection
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
}

module.exports = {
    handleSocketConnection,
};