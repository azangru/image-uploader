const fs = require('fs');
const fsExtra = require('fs-extra');
const { promisify } = require('util');

const fsReadDir = promisify(fs.readdir);
const fsReadFile = promisify(fs.readFile);

async function ensureDirectory(path) {
  try {
    await fsExtra.ensureDir(path);
  } catch (error) {
    console.log(`Failed to create directory at ${path}. Received error: ${error}`);
  }
}

async function removeDirectory(path) {
  try {
    await fsExtra.remove(path);
  } catch(error) {
    console.log(`Failed to remove ${path}. Received error: ${error}`);
  }
}

async function readDirectory(path) {
  try {
    return await fsReadDir(path);
  } catch (error) {
    console.log(`Failed to read contents of ${path}.`, error);
  }
}

async function readFile(path) {
  try {
    return await fsReadFile(path);
  } catch (error) {
    console.log(`Failed to read file at ${path}.`, error);
  }
}

async function moveFile(src, dest) {
  try {
    await fsExtra.move(src, dest, { overwrite: true });
  } catch (error) {
    console.log(`Failed to move file from ${src} to ${dest}.`, error);
  }
}

module.exports = {
  ensureDirectory,
  removeDirectory,
  readDirectory,
  readFile,
  moveFile
};
