const crypto = require('crypto');

const fileHelpers = require('./file-helpers');

const getFileHash = async (path) => {
  const hash = crypto.createHash('md5');
  try {
    const file = await fileHelpers.readFile(path);
    return hash.update(file).digest('hex');
  } catch (error) {
    console.log(`failed to create file hash for ${path}`);
  }
};

module.exports = {
  getFileHash
};
