const express = require('express');

const uuidMiddleware = require('./middleware/uuid-middleware');
const uploadRouter = require('./routers/upload-router');

const app = express();

// add an id to every request
app.use(uuidMiddleware);

app.use('/upload', uploadRouter);

module.exports = app;
