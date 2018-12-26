const path = require('path');
const Busboy = require('busboy');
const fs = require('fs');

const fileHelpers = require('../helpers/file-helpers');
const hashHelpers = require('../helpers/hash-helpers');

const config = require('../../config');

// https://github.com/mscdex/busboy
// https://gist.github.com/shobhitg/5b367f01b6daf46a0287

/*

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

*/

function saveFilesToTemporaryDirectory(req) {
  return new Promise((resolve) => {
    const busboy = new Busboy({ headers: req.headers });
    const tempDir = config.tempStoragePath;

    let openWriteStreams = 0;

    busboy.on('file', function(fieldname, file, filename) {
      openWriteStreams++;
      const tempFileName = getTempFilename(filename, req);
      const writeStream = fs.createWriteStream(`${tempDir}/${tempFileName}`);

      writeStream.on('finish', () => {
        openWriteStreams--;
        if (openWriteStreams === 0) {
          resolve(tempFileName);
        }
      });

      // file.on('data', () => {
      //   console.log('receiving data');
      // });
      // file.on('end', () => {
      //   console.log('file ended');
      // });
      file.pipe(writeStream);
    });

    req.pipe(busboy);
  });
}

function getTempFilename(filename, req) {
  const [ name, extension ] = filename.split('.').reduce((result, part, index, parts) => {
    if (index === parts.length - 1) {
      return [ result, part ];
    } else {
      return result + '.' + part;
    }
  });
  return `${name}-${req.uuid}-${Date.now()}.${extension}`;
}

module.exports = {
  saveFilesToTemporaryDirectory,
  getTempFilename
};
