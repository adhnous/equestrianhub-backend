// 📄 generate_trainingClasses.js
const { v4: uuidv4 } = require('uuid');
const TrainingClass = require('./models/TrainingClass');
const sequelize = require('./config/database');

// Helper to calculate start and end dates
const withDates = (scheduleDate) => {
  const start = new Date(scheduleDate);
  const end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000); // +7 days
  return { startDate: start, endDate: end };
};

const now = new Date();

const classes = [
  {
    id: uuidv4(),
    title: 'Intro to Horseback Riding',
    trainerId: '60166d3b-909d-477d-9207-8f1d092c70ac',
    scheduleDate: new Date('2025-04-21T10:00:00Z'),
    enrolledTrainees: ["3916aea8-4637-43c8-b626-cf0e7636ac85", "2eed1dd4-767e-4cf7-a49d-d7dad83c64ec"],
    ...withDates('2025-04-21T10:00:00Z'),
    createdAt: now,
    updatedAt: now
  },
  {
    id: uuidv4(),
    title: 'Stable Management',
    trainerId: '919190ba-1daf-4067-8e43-7cf6ce7709a5',
    scheduleDate: new Date('2025-04-22T10:00:00Z'),
    enrolledTrainees: ["15932671-490f-4ed2-9e4d-3c5c26de1c3d"],
    ...withDates('2025-04-22T10:00:00Z'),
    createdAt: now,
    updatedAt: now
  },
  {
    id: uuidv4(),
    title: 'Mounted Archery',
    trainerId: '3988cd99-5d1a-46c6-9c95-1bea9a45c6e2',
    scheduleDate: new Date('2025-04-23T10:00:00Z'),
    enrolledTrainees: ["284e34bd-0a71-422b-8dba-2f29983b8deb", "861bff71-d0bf-4f3f-b128-5be960e654c5"],
    ...withDates('2025-04-23T10:00:00Z'),
    createdAt: now,
    updatedAt: now
  }
];

async function generateTrainingClasses() {
  try {
    await sequelize.sync();
    await TrainingClass.bulkCreate(classes);
    console.log('✅ Training classes inserted successfully.');
  } catch (err) {
    console.error('❌ Error inserting training classes:', err.message);
  } finally {
    await sequelize.close();
  }
}

generateTrainingClasses();
