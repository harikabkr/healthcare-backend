"use strict";

require('dotenv').config();
module.exports = {
  HOST: process.env.DATABASE_HOST,
  USER: process.env.DATABASE_USER,
  PASSWORD: process.env.DATABASE_PASSWORD,
  DB: process.env.DATABASE_NAME,
  connectionLimit: 15,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};