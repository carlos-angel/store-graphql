const { db } = require('./../config');

module.exports = {
  development: {
    url: db.url,
    dialect: db.dialect,
  },
  production: {
    url: db.url,
    dialect: db.dialect,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
