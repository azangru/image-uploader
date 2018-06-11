const uuid = require('uuid/v4'); // version 4 (random) uuids

module.exports = (req, res, next) => {
  req.uuid = uuid();
  next();
};
