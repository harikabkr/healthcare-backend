const {
  DataTypes
} = require('sequelize');

const sequelize = require('../services/sequelizeService');

const Conversations = sequelize.define('conversations', {
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
  tableName: 'conversations'
});

module.exports = Conversations;