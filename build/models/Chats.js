"use strict";

var _require = require('sequelize'),
  DataTypes = _require.DataTypes;
var sequelize = require('../services/sequelizeService');
var Chats = sequelize.define('chats', {
  chatName: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'chats'
});
module.exports = Chats;