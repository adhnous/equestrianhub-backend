const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Trainee = sequelize.define('Trainee', {
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
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  level: {
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
    allowNull: true // It will be auto-generated
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true // It will be auto-generated
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'trainee'
  }
}, {
  tableName: 'Trainees',
  timestamps: true,
  hooks: {
    beforeCreate: (trainee) => {
      // Auto-generate username if not provided
      if (!trainee.username && trainee.name) {
        trainee.username = trainee.name.toLowerCase().replace(/\s+/g, '') + Math.floor(100 + Math.random() * 900);
      }

      // Auto-generate password if not provided
      if (!trainee.password) {
        trainee.password = 'pass' + Math.floor(1000 + Math.random() * 9000);
      }
    }
  }
});

Trainee.associate = (models) => {
  Trainee.belongsToMany(models.Competition, {
    through: 'CompetitionTrainees',
    foreignKey: 'traineeId',
    as: 'Competitions'
  });
};

module.exports = Trainee;
