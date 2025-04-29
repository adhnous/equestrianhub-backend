// 📄 models/CompetitionTrainers.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CompetitionTrainers = sequelize.define('CompetitionTrainers', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  competitionId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  trainerId: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = CompetitionTrainers;
