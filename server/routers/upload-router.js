const Express = require('express');

const {
  saveFilesToTemporaryDirectory
} = require('../helpers/upload-helpers');

const uploadRouter = Express.Router();

uploadRouter.post('/', async (req, res) => {
  const pathsToUploadedImages = await saveFilesToTemporaryDirectory(req);
  res.json(pathsToUploadedImages);
});

module.exports = uploadRouter;
