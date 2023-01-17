const { Sequelize } = require('sequelize');

const { config, db } = require('../config');
const setupModels = require('./models');

const options = {
  dialect: db.dialect,
  logging: config.isDev ? console.log : false,
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(db.url, options);

setupModels(sequelize);

module.exports = sequelize;
