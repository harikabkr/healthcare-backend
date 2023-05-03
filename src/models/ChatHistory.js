const {
    DataTypes
  } = require('sequelize');
  
  const sequelize = require('../services/sequelizeService');
  
  const ChatHistory = sequelize.define('chathistory', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userMessage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    aiReply: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'chathistory'
  });

  module.exports = ChatHistory;