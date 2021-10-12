const { Sequelize } = require('sequelize');
const { db, config } = require('./../config');
const setupModels = require('./../db/models');

const options = {
  dialect: db.dialect,
  logging: config.isDev,
};

if (!config.isDev) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(db.url, options);

setupModels(sequelize);

module.exports = sequelize;
