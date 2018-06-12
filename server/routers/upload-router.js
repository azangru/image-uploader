const Express = require('express');
const multer = require('multer');
const path = require('path');

const fileHelpers = require('../helpers/file-helpers');
const hashHelpers = require('../helpers/hash-helpers');

const config = require('../../config');

const destination = config.uploadFolderPath;

const getTemporaryStorageDirectoryName = (req) => {
  return path.resolve(config.tempStoragePath, req.uuid);
};

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const destination = getTemporaryStorageDirectoryName(req);
    await fileHelpers.ensureDirectory(destination);
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + '-' + Date.now());
  }
});

const upload = multer({
  storage
});

const uploadRouter = Express.Router();

uploadRouter.post('/', upload.any(), async (req, res) => {
  // at this point, files are uploaded to the temporary directory;
  // we want to add hash to their name, copy them to their final destination
  // and return paths to them in the response
  const tempDirectoryPath = getTemporaryStorageDirectoryName(req);
  const uploadedImages = await fileHelpers.readDirectory(tempDirectoryPath);

  const imageUrls = [];

  for (let i in uploadedImages) {
    const fileName = uploadedImages[i];
    const filePath = path.resolve(tempDirectoryPath, fileName);

    const hash = await hashHelpers.getFileHash(filePath);
    const restoredFileName = restoreFileName(fileName);
    const fileNameWithHash = addHashToFileName(restoredFileName, hash);
    const finalFilePath = path.resolve(destination, fileNameWithHash);

    await fileHelpers.moveFile(filePath, finalFilePath);

    imageUrls.push(`${config.publicPath}/${fileNameWithHash}`);
  }

  await fileHelpers.removeDirectory(tempDirectoryPath);

  res.json(imageUrls);
});

function restoreFileName(fileName) {
  // when files were saved, the timestamp was appended to their name;
  // now it has to be removed
  return fileName.replace(/-\d+$/, '');
}

function addHashToFileName(fileName, hash) {
  const nameParts = fileName.split('.');
  nameParts[nameParts.length - 2] = nameParts[nameParts.length - 2] + `-${hash}`;
  return nameParts.join('.');
}

module.exports = uploadRouter;
