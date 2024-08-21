const express = require('express');
const cors = require('cors')
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const { createServer } = require('node:http');
const { Server } = require('socket.io');


const indexRouter = require('./routes/index.js');
const usersRouter = require('./routes/users.js');
const userIntentsRouter = require('./routes/userIntents.js');
const plansRouter = require('./routes/plans.js');
const authRoutes = require('./routes/auth.js');

// const authMiddleware = require('./middlewares/firebaseJwtAuth.js');


const app = express();


const server = createServer(app);
// const io = new Server(server);

app.use(cors());

const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/usersIntents', userIntentsRouter);
app.use('/api/plans', plansRouter);
app.use('/auth', authRoutes);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        socket.broadcast.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


// app.use(authMiddleware);
module.exports = server;