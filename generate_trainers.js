const sequelize = require('./config/database');
const Trainer = require('./models/Trainer');
const { v4: uuidv4 } = require('uuid');

const trainers = [
  { name: 'John Smith', gender: 'male', specialty: 'Jumping', email: 'john.smith@example.com', role: 'trainer' },
  { name: 'Emily Davis', gender: 'female', specialty: 'Dressage', email: 'emily.davis@example.com', role: 'trainer' },
  { name: 'Ahmed Ali', gender: 'male', specialty: 'Endurance', email: 'ahmed.ali@example.com', role: 'trainer' },
  { name: 'Sara Chen', gender: 'female', specialty: 'Polo', email: 'sara.chen@example.com', role: 'trainer' },
  { name: 'Daniel Green', gender: 'male', specialty: 'Trail Riding', email: 'daniel.green@example.com', role: 'trainer' },
  { name: 'Mona Elmasry', gender: 'female', specialty: 'Show Jumping', email: 'mona.elmasry@example.com', role: 'trainer' },
  { name: 'Luke Patel', gender: 'male', specialty: 'Horse Behavior', email: 'luke.patel@example.com', role: 'trainer' },
  { name: 'Fatima Nour', gender: 'female', specialty: 'Equine Therapy', email: 'fatima.nour@example.com', role: 'trainer' },
  { name: 'Zane Thompson', gender: 'male', specialty: 'Mounted Archery', email: 'zane.thompson@example.com', role: 'trainer' },
  { name: 'Amina Rahman', gender: 'female', specialty: 'Racing', email: 'amina.rahman@example.com', role: 'trainer' }
];

async function seed() {
  try {
    await sequelize.sync();

    for (const t of trainers) {
      await Trainer.create({
        id: uuidv4(),
        name: t.name,
        gender: t.gender,
        specialty: t.specialty,
        email: t.email,
        role: t.role,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`✅ Added trainer: ${t.name}`);
    }

    console.log('🎉 Trainer seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();

