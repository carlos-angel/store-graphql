const { Sequelize } = require('sequelize');
const { db } = require('./../config');
const setupModels = require('./../db/models');

const USER = encodeURIComponent(db.user);
const PASSWORD = encodeURIComponent(db.password);

let uri = `postgres://${USER}:${PASSWORD}@${db.host}:${db.port}/${db.name}`;

const sequelize = new Sequelize(uri, {
  dialect: db.dialect,
  logging: true,
});

setupModels(sequelize);

sequelize.sync();

module.exports = sequelize;
