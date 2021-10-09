require('dotenv').config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
};

const db = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  name: process.env.DB_NAME,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
};

module.exports = { config, db };
