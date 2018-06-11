const crypto = require('crypto');

const fileHelpers = require('./file-helpers');

const hash = crypto.createHash('md5');

const getFileHash = async (path) => {
  console.log('path', path);
  const file = await fileHelpers.readFile(path);
  return hash.update(file).digest('hex');
};

module.exports = {
  getFileHash
};
