const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Competition = sequelize.define('Competition', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [3, 100] }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('jumping', 'racing', 'dressage', 'other'),
    allowNull: false
  }
}, {
  timestamps: true
});

// ✅ All associations merged into one
Competition.associate = (db) => {
  Competition.belongsToMany(db.Trainer, {
    through: 'CompetitionTrainers',
    foreignKey: 'competitionId',
    as: 'Trainers'
  });

  Competition.belongsToMany(db.Horse, {
    through: 'CompetitionHorses',
    foreignKey: 'competitionId',
    as: 'Horses'
  });

  Competition.belongsToMany(db.Trainee, {
    through: 'CompetitionTrainees',
    foreignKey: 'competitionId',
    as: 'Trainees'
  });

  Competition.hasMany(db.CompetitionHorseAssignment, {
    foreignKey: 'competitionId',
    as: 'CompetitionHorseAssignments'
  });
};

module.exports = Competition;
