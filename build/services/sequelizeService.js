"use strict";

/**
 * sequelizeService 
 * This file has functions built to connect and create database tables related to application using Sequelize packages
 */

var Sequelize = require("sequelize");
var dbConfig = require("../db.config.js");

// import Conversations from '../models/Conversations';

var sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  // operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// const db = {};

// db.sequelize = sequelize;
// db.Conversations = Conversations(sequelize);

// module.exports = db;
module.exports = sequelize;