const express = require('express');
const path = require('path');

const uuidMiddleware = require('./middleware/uuid-middleware');
const uploadRouter = require('./routers/upload-router');

const app = express();
const pathToStatic = path.resolve(__dirname, '../build');
const pathToHTML = path.resolve(pathToStatic, 'index.html');

// add an id to every request
app.use(uuidMiddleware);

app.use(express.static(pathToStatic));

app.use('/upload', uploadRouter);

app.get('/', (req, res) => {
  res.sendFile(pathToHTML);
});

module.exports = app;
