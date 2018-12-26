const app = require('./server');
const config = require('../config');

const fileHelpers = require('./helpers/file-helpers');

const PORT = config.expressPort;

async function initialize () {
  // make sure that the local temporary directory for file storage exists
  await fileHelpers.ensureDirectory(config.tempStoragePath);

  app.listen(PORT, () => {
    console.log(`Image uploader is listening on port ${PORT}`);
  });
}

initialize();
