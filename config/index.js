require('dotenv').config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',
  jwtSecret: process.env.JWT_SECRET,
};

const db = {
  url: process.env.DATABASE_URL,
  dialect: process.env.DB_DIALECT,
};

const api = {
  key: process.env.API_KEY,
};

const mail = {
  host: process.env.HOST_MAIL,
  port: process.env.PORT_MAIL,
  user: process.env.USER_MAIL,
  password: process.env.PASSWORD_MAIL,
  jwtSecret: process.env.JWT_SECRET_MAIL,
};

module.exports = { config, db, api, mail };
