require('dotenv').config()

var config = {

  HOST: process.env.DB_HOST || "161.35.123.43",
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  DIALECT: process.env.DB_DIALECT || "postgres"

};
module.exports = config;