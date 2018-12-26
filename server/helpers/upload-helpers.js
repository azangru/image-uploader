const Busboy = require('busboy');
const fs = require('fs');
const crypto = require('crypto');

const fileHelpers = require('../helpers/file-helpers');

const config = require('../../config');

function saveFilesToTemporaryDirectory(req) {
  return new Promise((resolve) => {
    const busboy = new Busboy({ headers: req.headers });
    const publicFilePaths = [];

    let openWriteStreams = 0;

    busboy.on('file', function(fieldname, file, filename) {
      openWriteStreams++;
      const hash = crypto.createHash('md5');
      const tempFilePath = getTempFilePath(filename, req);
      const writeStream = fs.createWriteStream(tempFilePath);

      file.on('data', function(chunk) {
        hash.update(chunk);
      });

      writeStream.on('finish', async () => {
        openWriteStreams--;
        const hashedFileContent = hash.digest('hex');
        const finalFileName = getFinalFileName(filename, hashedFileContent);
        const uploadFilePath = getFinalFilePath(finalFileName);
        const publicFilePath = getPublicFilePath(finalFileName);

        await fileHelpers.moveFile(tempFilePath, uploadFilePath);
        publicFilePaths.push(publicFilePath);

        if (openWriteStreams === 0) {
          resolve(publicFilePaths);
        }
      });

      file.pipe(writeStream);
    });

    req.pipe(busboy);
  });
}

function getTempFilePath(filename, req) {
  const tempDir = config.tempStoragePath;
  const fileName = getTempFilename(filename, req);
  return `${tempDir}/${fileName}`;
}

function getTempFilename(filename, req) {
  const { name, extension } = splitFilename(filename);
  return `${name}-${req.uuid}-${Date.now()}.${extension}`;
}

function getFinalFilePath(filename) {
  const uploadDir = config.uploadFolderPath;
  return `${uploadDir}/${filename}`;
}

function getFinalFileName(filename, hash) {
  const { name, extension } = splitFilename(filename);
  return `${name}-${hash}.${extension}`;
}

function getPublicFilePath(filename) {
  return `${config.publicPath}/${filename}`;
}

function splitFilename(filename) {
  const [ name, extension ] = filename.split('.').reduce((result, part, index, parts) => {
    if (index === parts.length - 1) {
      return [ result, part ];
    } else {
      return result + '.' + part;
    }
  });
  return { name, extension };
}

module.exports = {
  saveFilesToTemporaryDirectory,
  getTempFilename
};
