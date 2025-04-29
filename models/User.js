const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
  primaryKey: true,
  defaultValue: DataTypes.UUIDV4
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING, // "admin", "trainer", or "trainee"
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = User;
