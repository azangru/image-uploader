const path = require('path');

const getVar = (name, otherwise) => process.env[name] || otherwise;

const tempStoragePath = path.resolve(__dirname, 'temp');
const defaultUploadFolderPath = path.resolve(__dirname, 'uploaded-images');

const defaultConfig = {
  tempStoragePath,
  uploadFolderPath: getVar('UPLOAD_DIR_PATH', defaultUploadFolderPath), // <-- path to local directory where to put images
  publicPath: getVar('PUBLIC_PATH', defaultUploadFolderPath), // <-- url of directory where the files are stored
  expressPort: getVar('EXPRESS_PORT', 3000)
};

module.exports = defaultConfig;
