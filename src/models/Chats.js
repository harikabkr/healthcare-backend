const {
    DataTypes
  } = require('sequelize');
  
  const sequelize = require('../services/sequelizeService');
  
  const Chats = sequelize.define('chats', {
    chatName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'chats'
  });

  module.exports = Chats;