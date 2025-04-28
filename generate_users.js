// 📄 generate_users.js
const { v4: uuidv4 } = require('uuid');
const sequelize = require('./config/database');
const User = require('./models/User');

const generateUsers = async () => {
  await sequelize.sync(); // Ensure DB connection

  const users = [
    {
      username: 'admin1',
      password: 'adminpass1', // In production, always hash passwords!
      role: 'admin',
      email: 'admin1@equestrianhub.com'
    },
    {
      username: 'admin2',
      password: 'adminpass2',
      role: 'admin',
      email: 'admin2@equestrianhub.com'
    },
    {
      username: 'admin3',
      password: 'adminpass3',
      role: 'admin',
      email: 'admin3@equestrianhub.com'
    }
  ];

  try {
    for (const user of users) {
      await User.create({
        id: uuidv4(),
        ...user,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`✅ Inserted admin: ${user.username}`);
    }

    console.log('🎉 All admin users inserted successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to insert admin users:', error.message);
    process.exit(1);
  }
};

generateUsers();
