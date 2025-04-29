const { v4: uuidv4 } = require('uuid');
const sequelize = require('./config/database');
const Horse = require('./models/Horse');

const horses = [
  { name: 'Thunderbolt', breed: 'Arabian', age: 5, gender: 'male', height: 1.5, weight: 450, color: 'brown', medicalHistory: 'Healthy. Vaccinated.', imageUrl: 'https://example.com/thunderbolt.jpg' },
  { name: 'Moonlight', breed: 'Thoroughbred', age: 7, gender: 'female', height: 1.6, weight: 470, color: 'black', medicalHistory: 'No known issues.', imageUrl: 'https://example.com/moonlight.jpg' },
  { name: 'Starfire', breed: 'Andalusian', age: 6, gender: 'female', height: 1.55, weight: 460, color: 'grey', medicalHistory: 'Minor injury in 2023. Recovered.', imageUrl: 'https://example.com/starfire.jpg' },
  { name: 'Shadow', breed: 'Friesian', age: 8, gender: 'male', height: 1.7, weight: 500, color: 'black', medicalHistory: 'Healthy.', imageUrl: 'https://example.com/shadow.jpg' },
  { name: 'Sapphire', breed: 'Lusitano', age: 4, gender: 'female', height: 1.5, weight: 445, color: 'white', medicalHistory: 'Allergic to dust.', imageUrl: 'https://example.com/sapphire.jpg' },
  { name: 'Comet', breed: 'Quarter Horse', age: 6, gender: 'male', height: 1.6, weight: 480, color: 'chestnut', medicalHistory: 'Healthy.', imageUrl: 'https://example.com/comet.jpg' },
  { name: 'Aurora', breed: 'Mustang', age: 5, gender: 'female', height: 1.45, weight: 430, color: 'palomino', medicalHistory: 'Recovered from leg injury.', imageUrl: 'https://example.com/aurora.jpg' },
  { name: 'Tornado', breed: 'Hanoverian', age: 7, gender: 'male', height: 1.68, weight: 495, color: 'grey', medicalHistory: 'Dental treatment needed yearly.', imageUrl: 'https://example.com/tornado.jpg' },
  { name: 'Zephyr', breed: 'Morgan', age: 5, gender: 'male', height: 1.52, weight: 440, color: 'dark bay', medicalHistory: 'Healthy.', imageUrl: 'https://example.com/zephyr.jpg' },
  { name: 'Luna', breed: 'Paint', age: 6, gender: 'female', height: 1.57, weight: 465, color: 'piebald', medicalHistory: 'Vaccinated.', imageUrl: 'https://example.com/luna.jpg' }
];

async function seedHorses() {
  try {
    await sequelize.sync();

    for (const h of horses) {
      await Horse.create({
        id: uuidv4(),
        ...h,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`✅ Inserted horse: ${h.name}`);
    }

    console.log('🎉 All horses inserted successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to insert horses:', error.message);
    process.exit(1);
  }
}

seedHorses();
