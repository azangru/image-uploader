const app = require('./server');
const config = require('../config');

const PORT = config.expressPort;

app.listen(PORT, () => {
  console.log(`Image uploader is listening on port ${PORT}`);
})
