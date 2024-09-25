const express = require('express');
const cors = require('cors')
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const { getMQTTBrokerInstance } = require('./config/mqtt.js');

const indexRouter = require('./routes/index.js');
const usersRouter = require('./routes/usersRouter.js');
const userIntentsRouter = require('./routes/userIntentsRouter.js');
const plansRouter = require('./routes/plansRouter.js');
const plantsMetricsRouter = require('./routes/plantsMetricsRouter.js');
const hydroponicsRouter = require('./routes/hydroponicsRouter.js');
const plantHistoryRouter = require('./routes/plantHistoryRouter.js');
const plantMetricSnapshotRouter = require('./routes/plantMetricSnapshotRouter.js');

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
app.use('/api/usersIntents', userIntentsRouter);
app.use('/api/plans', plansRouter);
app.use('/api/plant-metric', plantsMetricsRouter);
app.use('/api/hydroponic', hydroponicsRouter);
app.use('/api/plant-history', plantHistoryRouter);
app.use('/api/plant-metric-snapshot', plantMetricSnapshotRouter);

app.use('/auth', authRoutes);

module.exports = app;