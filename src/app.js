const express = require('express');
const cors = require('cors')
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index.js');
const usersRouter = require('./routes/users.js');
const authRoutes = require('./routes/auth.js');

// const authMiddleware = require('./middlewares/firebaseJwtAuth.js');


const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/auth', authRoutes);



// app.use(authMiddleware);
module.exports = app;