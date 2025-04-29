// 📄 models/CompetitionHorseAssignment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CompetitionHorseAssignment = sequelize.define('CompetitionHorseAssignment', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  competitionId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  horseId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: { // ✅ was assigneeId
    type: DataTypes.STRING,
    allowNull: false
  },
  userRole: { // ✅ was assigneeRole
    type: DataTypes.ENUM('trainer', 'trainee'),
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = CompetitionHorseAssignment;
