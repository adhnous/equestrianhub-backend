const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/database.sqlite', // make sure 'data' folder exists
});

module.exports = sequelize;
