const { db } = require('./../config');

const USER = encodeURIComponent(db.user);
const PASSWORD = encodeURIComponent(db.password);

let uri = `${db.dialect}://${USER}:${PASSWORD}@${db.host}:${db.port}/${db.name}`;

module.exports = {
  development: {
    url: uri,
    dialect: db.dialect,
  },
  production: {
    url: uri,
    dialect: db.dialect,
  },
};
