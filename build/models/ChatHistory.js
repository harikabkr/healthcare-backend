"use strict";

var _require = require('sequelize'),
  DataTypes = _require.DataTypes;
var sequelize = require('../services/sequelizeService');
var ChatHistory = sequelize.define('chathistory', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userMessage: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  aiReply: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'chathistory'
});
module.exports = ChatHistory;