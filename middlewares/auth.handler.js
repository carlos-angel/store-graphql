const boom = require('@hapi/boom');
const { api } = require('../config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];

  if (apiKey === api.key) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

module.exports = {
  checkApiKey,
};
