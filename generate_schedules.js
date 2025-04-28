const { v4: uuidv4 } = require('uuid');
const sequelize = require('./config/database');
const Trainer = require('./models/Trainer');
const Trainee = require('./models/Trainee');
const Horse = require('./models/Horse');
const TrainingClass = require('./models/TrainingClass');
const Schedule = require('./models/Schedule');
const User = require('./models/User');

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const now = () => new Date();

const trainers = [
  { name: 'John Smith', gender: 'male', specialty: 'Jumping', email: 'john.smith@example.com', role: 'trainer' },
  { name: 'Emily Davis', gender: 'female', specialty: 'Dressage', email: 'emily.davis@example.com', role: 'trainer' },
  { name: 'Ali Mansour', gender: 'male', specialty: 'Endurance', email: 'ali.mansour@example.com', role: 'trainer' },
  { name: 'Layla Kassem', gender: 'female', specialty: 'Polo', email: 'layla.kassem@example.com', role: 'trainer' },
  { name: 'Omar Alami', gender: 'male', specialty: 'Trail Riding', email: 'omar.alami@example.com', role: 'trainer' }
];

const trainees = [
  { name: 'Mohamed Adel', gender: 'male', age: 16, level: 'beginner', email: 'mohamed@example.com', role: 'trainee' },
  { name: 'Fatima Zahra', gender: 'female', age: 15, level: 'intermediate', email: 'fatima@example.com', role: 'trainee' },
  { name: 'Youssef Karim', gender: 'male', age: 17, level: 'advanced', email: 'youssef@example.com', role: 'trainee' },
  { name: 'Sara Nour', gender: 'female', age: 14, level: 'beginner', email: 'sara@example.com', role: 'trainee' },
  { name: 'Lina Hammoud', gender: 'female', age: 16, level: 'intermediate', email: 'lina@example.com', role: 'trainee' }
];

const horses = [
  { name: 'Thunder', breed: 'Arabian', age: 5, gender: 'male', height: 1.5, weight: 450, color: 'brown', medicalHistory: 'Healthy', imageUrl: 'https://example.com/horse1.jpg' },
  { name: 'Lightning', breed: 'Thoroughbred', age: 6, gender: 'female', height: 1.6, weight: 460, color: 'black', medicalHistory: 'Healthy', imageUrl: 'https://example.com/horse2.jpg' },
  { name: 'Zephyr', breed: 'Morgan', age: 4, gender: 'male', height: 1.52, weight: 440, color: 'dark bay', medicalHistory: 'Healthy', imageUrl: 'https://example.com/horse3.jpg' },
  { name: 'Luna', breed: 'Paint', age: 6, gender: 'female', height: 1.57, weight: 465, color: 'piebald', medicalHistory: 'Vaccinated', imageUrl: 'https://example.com/horse4.jpg' },
  { name: 'Comet', breed: 'Quarter Horse', age: 6, gender: 'male', height: 1.6, weight: 480, color: 'chestnut', medicalHistory: 'Healthy', imageUrl: 'https://example.com/horse5.jpg' }
];

const admins = [
  { username: 'admin', password: 'admin123', email: 'admin@example.com', role: 'admin' }
];

async function seedAll() {
  try {
    await sequelize.sync();

    // Seed Admins
    for (const admin of admins) {
      await User.create({ id: uuidv4(), ...admin, createdAt: now(), updatedAt: now() });
      console.log(`✅ Inserted admin: ${admin.username}`);
    }

    // Seed Trainers
    const trainerIDs = [];
    for (const t of trainers) {
      const trainer = await Trainer.create({ id: uuidv4(), ...t, createdAt: now(), updatedAt: now() });
      trainerIDs.push(trainer.id);
      console.log(`✅ Inserted trainer: ${t.name}`);
    }

    // Seed Trainees
    const traineeIDs = [];
    for (const tr of trainees) {
      const trainee = await Trainee.create({ id: uuidv4(), ...tr, createdAt: now(), updatedAt: now() });
      traineeIDs.push(trainee.id);
      console.log(`✅ Inserted trainee: ${tr.name}`);
    }

    // Seed Horses
    const horseIDs = [];
    for (const h of horses) {
      const horse = await Horse.create({ id: uuidv4(), ...h, createdAt: now(), updatedAt: now() });
      horseIDs.push(horse.id);
      console.log(`✅ Inserted horse: ${h.name}`);
    }

    // Seed Classes
    const classIDs = [];
    for (const tid of trainerIDs) {
      for (let i = 0; i < 2; i++) {
        const scheduled = new Date();
        scheduled.setDate(scheduled.getDate() + i);
        const trainingClass = await TrainingClass.create({
          id: uuidv4(),
          title: `Training Class ${i + 1}`,
          trainerId: tid,
          scheduleDate: scheduled.toISOString(),
          enrolledTrainees: [],
          createdAt: now(),
          updatedAt: now()
        });
        classIDs.push(trainingClass.id);
        console.log(`✅ Created class for trainer ${tid}: Training Class ${i + 1}`);
      }
    }

    // Seed Schedules
    for (const classId of classIDs) {
      const trainingClass = await TrainingClass.findByPk(classId);
      const traineeIdsForClass = new Set();

      for (let j = 0; j < 3; j++) {
        const scheduledDate = new Date(trainingClass.scheduleDate);
        scheduledDate.setDate(scheduledDate.getDate() + j);
        const traineeId = randomItem(traineeIDs);
        const horseId = randomItem(horseIDs);
        traineeIdsForClass.add(traineeId);

        await Schedule.create({
          id: uuidv4(),
          classId: trainingClass.id,
          trainerId: trainingClass.trainerId,
          traineeId,
          horseId,
          date: scheduledDate.toISOString(),
          status: 'scheduled',
          createdAt: now(),
          updatedAt: now()
        });

        console.log(`✅ Schedule created for class: ${trainingClass.title} on ${scheduledDate.toDateString()}`);
      }

      // Update enrolledTrainees in the class
      await trainingClass.update({ enrolledTrainees: Array.from(traineeIdsForClass) });
    }

    console.log('🎉 All data seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during seeding:', err.message);
    process.exit(1);
  }
}

seedAll();
