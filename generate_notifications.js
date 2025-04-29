// 📄 generate_notifications.js
const { v4: uuidv4 } = require('uuid');
const Notification = require('./models/Notification');
const sequelize = require('./config/database');

const notifications = [
  {
    id: uuidv4(),
    title: 'Session Reminder',
    message: 'Your riding class starts tomorrow at 9:00 AM.',
    recipientId: '3916aea8-4637-43c8-b626-cf0e7636ac85',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    title: 'New Schedule Added',
    message: 'Check out your updated class schedule.',
    recipientId: '15932671-490f-4ed2-9e4d-3c5c26de1c3d',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function generateNotifications() {
  try {
    await sequelize.sync(); // ensure db is ready
    await Notification.bulkCreate(notifications);
    console.log('✅ Notifications inserted successfully.');
  } catch (err) {
    console.error('❌ Error inserting notifications:', err.message);
  } finally {
    await sequelize.close();
  }
}

generateNotifications();
