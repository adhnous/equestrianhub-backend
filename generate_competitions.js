// 📄 scripts/generate_competitions.js
const { v4: uuidv4 } = require('uuid');
const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');
const Competition = require('./models/Competition');

async function seedCompetitions() {
  await sequelize.sync();

  const competitions = [
    {
      id: uuidv4(),
      name: 'Spring Show Jumping Championship',
      date: new Date('2025-05-10'),
      location: 'Green Valley Arena',
      type: 'jumping'
    },
    {
      id: uuidv4(),
      name: 'Summer Racing League',
      date: new Date('2025-07-15'),
      location: 'Desert Track Circuit',
      type: 'racing'
    },
    {
      id: uuidv4(),
      name: 'National Dressage Finals',
      date: new Date('2025-09-01'),
      location: 'Royal Equestrian Grounds',
      type: 'dressage'
    }
  ];

  for (const competition of competitions) {
    await Competition.create(competition);
  }

  console.log('✅ Competitions seeded successfully.');
  await sequelize.close();
}

seedCompetitions();
