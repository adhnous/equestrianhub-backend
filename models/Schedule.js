const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Schedule = sequelize.define('Schedule', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  classId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  trainerId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  traineeId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  horseId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Schedules',
  timestamps: true
});

module.exports = Schedule;
