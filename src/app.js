const express = require('express');
const cors = require('cors')
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const { getMQTTBrokerInstance } = require('./config/mqtt.js');

const usersRouter = require('./accounts/urls/usersRouter.js');
const userIntentsRouter = require('./accounts/urls/userIntentsRouter.js');
const plansRouter = require('./plans/urls.js');
const plantsMetricsRouter = require('./plantMetrics/urls.js');
const hydroponicsRouter = require('./hydroponic/urls.js');
const plantHistoryRouter = require('./plantHistory/urls.js');
const plantMetricSnapshotRouter = require('./plantMetricSnapshots/urls.js');
const authRoutes = require('./accounts/urls/auth.js');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/usersIntents', userIntentsRouter);
app.use('/api/plans', plansRouter);
app.use('/api/plant-metric', plantsMetricsRouter);
app.use('/api/hydroponic', hydroponicsRouter);
app.use('/api/plant-history', plantHistoryRouter);
app.use('/api/plant-metric-snapshot', plantMetricSnapshotRouter);

app.use('/auth', authRoutes);

module.exports = app;