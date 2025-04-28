// 📄 models/Trainer.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Trainer = sequelize.define('Trainer', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  specialty: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    },
    allowNull: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'trainer'
  }
}, {
  tableName: 'Trainers',
  timestamps: true,
  hooks: {
    beforeCreate: (trainer) => {
      if (!trainer.username && trainer.name) {
        trainer.username = trainer.name.toLowerCase().replace(/\s+/g, '') + Math.floor(100 + Math.random() * 900);
      }
      if (!trainer.password) {
        trainer.password = 'pass' + Math.floor(1000 + Math.random() * 9000);
      }
    }
  }
});

// ⬇️ Inverse association
Trainer.associate = (models) => {
  Trainer.belongsToMany(models.Competition, {
    through: 'CompetitionTrainers',
    foreignKey: 'trainerId'
  });
};

module.exports = Trainer;