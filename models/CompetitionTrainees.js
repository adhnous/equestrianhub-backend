// 📄 models/CompetitionTrainees.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CompetitionTrainees = sequelize.define('CompetitionTrainees', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  competitionId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  traineeId: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = CompetitionTrainees;