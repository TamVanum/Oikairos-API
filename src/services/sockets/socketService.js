const { db } = require('../../config/firebase');

function handleSocketConnection(socket) {
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    socket.on('sendMessage', async (messageData) => {
        const { roomId, message } = messageData;
        console.log(`Received message: ${message} in room: ${roomId}`);

        await db.collection('rooms').doc(roomId).collection('messages').add({
            message,
            timestamp: new Date(),
            senderId: socket.id
        });

        socket.to(roomId).emit('newMessage', { message, senderId: socket.id });
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
}

module.exports = {
    handleSocketConnection,
};