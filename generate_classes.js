const { v4: uuidv4 } = require('uuid');
const sequelize = require('./config/database');
const TrainingClass = require('./models/TrainingClass');
const Trainer = require('./models/Trainer');

const generateRandomDate = (index) => {
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() + index);
  return baseDate.toISOString().split('T')[0];
};

const classTitles = [
  'Jumping Basics', 'Advanced Dressage', 'Endurance Ride',
  'Trail Blazing', 'Polo Skills', 'Therapy Session',
  'Mounted Combat', 'Horse Psychology', 'Racing Tactics', 'Obstacle Navigation'
];

async function seedClasses() {
  try {
    await sequelize.sync();

    const trainers = await Trainer.findAll();
    if (trainers.length === 0) {
      console.log('⚠️ No trainers found.');
      return;
    }

    for (const trainer of trainers) {
      for (let i = 0; i < 10; i++) {
        const classData = {
          id: uuidv4(),
          title: classTitles[i % classTitles.length] + ` (${trainer.name})`,
          trainerId: trainer.id,
          scheduleDate: generateRandomDate(i),
          enrolledTrainees: [],
          createdAt: new Date(),
          updatedAt: new Date()
        };

        await TrainingClass.create(classData);
        console.log(`✅ Created class: ${classData.title} for ${trainer.name}`);
      }
    }

    console.log('🎉 All training classes generated successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error generating training classes:', err);
    process.exit(1);
  }
}

seedClasses();
