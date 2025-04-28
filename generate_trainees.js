// 📄 scripts/generate_trainees.js
const { v4: uuidv4 } = require('uuid');
const sequelize = require('./config/database');
const Trainee = require('./models/Trainee');

const generateTrainees = async () => {
  await sequelize.sync();

  const trainees = [
    {
      name: 'Hamza Salah',
      gender: 'male',
      age: 14,
      level: 'beginner',
      email: 'hamza14@example.com',
      role: 'trainee'
    },
    {
      name: 'Sara Ahmed',
      gender: 'female',
      age: 16,
      level: 'intermediate',
      email: 'sara16@example.com',
      role: 'trainee'
    },
    {
      name: 'Lina Farouk',
      gender: 'female',
      age: 15,
      level: 'beginner',
      email: 'lina15@example.com',
      role: 'trainee'
    },
    {
      name: 'Youssef Ali',
      gender: 'male',
      age: 17,
      level: 'advanced',
      email: 'youssef17@example.com',
      role: 'trainee'
    },
    {
      name: 'Zainab Khalid',
      gender: 'female',
      age: 13,
      level: 'beginner',
      email: 'zainab13@example.com',
      role: 'trainee'
    },
    {
      name: 'Mohamed Adel',
      gender: 'male',
      age: 18,
      level: 'advanced',
      email: 'mohamed18@example.com',
      role: 'trainee'
    }
  ];

  try {
    for (const trainee of trainees) {
      await Trainee.create({
        id: uuidv4(),
        ...trainee,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`✅ Inserted trainee: ${trainee.name}`);
    }

    console.log('🎉 All trainees inserted successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to insert trainees:', error.message);
    process.exit(1);
  }
};

generateTrainees();
