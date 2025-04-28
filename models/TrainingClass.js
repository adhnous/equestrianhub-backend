const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TrainingClass = sequelize.define('TrainingClass', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  trainerId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  scheduleDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0
  },
  enrolledTrainees: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  }
}, {
  timestamps: true
});

module.exports = TrainingClass;
