// // 📄 scripts/seedEntities.js
// const { v4: uuidv4 } = require('uuid');
// const db = require('./models');

// async function seedEntities() {
//   await db.sequelize.sync({ force: true });
//   console.log('🔁 Database synced');

//   const trainers = [];
//   const horses = [];
//   const trainees = [];
//   const competitions = [];

//   await db.User.create({
//     id: uuidv4(),
//     username: 'admin',
//     password: 'admin123',
//     role: 'admin'
//   });
//   console.log('✅ Admin user created');

//   for (let i = 1; i <= 10; i++) {
//     const trainer = await db.Trainer.create({
//       id: uuidv4(),
//       name: `Trainer ${i}`,
//       gender: i % 2 === 0 ? 'female' : 'male',
//       specialty: ['jumping', 'racing', 'dressage'][i % 3],
//       email: `trainer${i}@riders.com`,
//       role: 'trainer'
//     });
//     trainers.push(trainer);

//     const horse = await db.Horse.create({
//       id: uuidv4(),
//       name: `Horse ${i}`,
//       breed: ['Arabian', 'Thoroughbred', 'Quarter'][i % 3],
//       age: 5 + i,
//       gender: i % 2 === 0 ? 'female' : 'male',
//       color: ['black', 'white', 'brown'][i % 3]
//     });
//     horses.push(horse);

//     const trainee = await db.Trainee.create({
//       id: uuidv4(),
//       name: `Trainee ${i}`,
//       gender: i % 2 === 0 ? 'female' : 'male',
//       age: 15 + i,
//       level: ['beginner', 'intermediate', 'advanced'][i % 3],
//       email: `trainee${i}@school.com`
//     });
//     trainees.push(trainee);

//     const competition = await db.Competition.create({
//       id: uuidv4(),
//       name: `Competition ${i}`,
//       date: new Date(`2025-10-${i < 10 ? '0' + i : i}`),
//       location: `Arena ${i}`,
//       type: ['jumping', 'racing', 'dressage'][i % 3]
//     });
//     competitions.push(competition);

//     await Promise.all([
//       competition.addTrainer(trainer),
//       competition.addHorse(horse),
//       competition.addTrainee(trainee)
//     ]);

//     await db.CompetitionHorseAssignment.create({
//       id: uuidv4(),
//       competitionId: competition.id,
//       horseId: horse.id,
//       userId: trainee.id,
//       userRole: 'trainee'
//     });

//     await db.CompetitionHorseAssignment.create({
//       id: uuidv4(),
//       competitionId: competition.id,
//       horseId: horse.id,
//       userId: trainer.id,
//       userRole: 'trainer'
//     });

//     await db.Notification.create({
//       id: uuidv4(),
//       title: `Welcome ${i}`,
//       message: `Hello Trainee ${i}, you have been enrolled successfully!`,
//       recipientId: trainee.id
//     });

//     const trainingClass = await db.TrainingClass.create({
//       id: uuidv4(),
//       title: `Class ${i}`,
//       trainerId: trainer.id,
//       cost: 100 + i,
//       startDate: new Date(`2025-09-${i < 10 ? '0' + i : i}`),
//       endDate: new Date(`2025-09-${10 + i}`),
//       enrolledTrainees: [trainee.id]
//     });

//     await db.Schedule.create({
//       id: uuidv4(),
//       classId: trainingClass.id,
//       trainerId: trainer.id,
//       traineeId: trainee.id,
//       horseId: horse.id,
//       date: new Date(`2025-09-${10 + i}`),
//       status: 'confirmed'
//     });
//   }

//   console.log('✅ 10 entries for each entity seeded successfully, including trainee enrollments and horse assignments');
//   await db.sequelize.close();
//   process.exit();
// }

// seedEntities().catch((err) => {
//   console.error('❌ Seeding error:', err);
//   process.exit(1);
// });
// 📄 scripts/seedEntities.js
const { v4: uuidv4 } = require('uuid');
const db = require('./models');

async function seedEntities() {
  await db.sequelize.sync({ force: true });
  console.log('🔁 Database synced');

  const trainers = [];
  const horses = [];
  const trainees = [];
  const competitions = [];

  await db.User.create({
    id: uuidv4(),
    username: 'admin',
    password: 'admin123',
    role: 'admin'
  });
  console.log('✅ Admin user created');

  const libyanTrainers = [
    { name: 'Ahmed El-Mahdi', gender: 'male', specialty: 'jumping', email: 'ahmed.mahdi@riders.ly' },
    { name: 'Sara Ben Ghalia', gender: 'female', specialty: 'racing', email: 'sara.ghalia@riders.ly' },
    { name: 'Yousef Al-Zayani', gender: 'male', specialty: 'dressage', email: 'yousef.zayani@riders.ly' },
    { name: 'Huda Al-Fitouri', gender: 'female', specialty: 'jumping', email: 'huda.fitouri@riders.ly' },
    { name: 'Omar Al-Mansour', gender: 'male', specialty: 'racing', email: 'omar.mansour@riders.ly' },
    { name: 'Mariam Al-Badri', gender: 'female', specialty: 'dressage', email: 'mariam.badri@riders.ly' },
    { name: 'Tariq Al-Haddad', gender: 'male', specialty: 'jumping', email: 'tariq.haddad@riders.ly' },
    { name: 'Asma Al-Kabir', gender: 'female', specialty: 'racing', email: 'asma.kabir@riders.ly' },
    { name: 'Mohamed Al-Gharyani', gender: 'male', specialty: 'dressage', email: 'mohamed.gharyani@riders.ly' },
    { name: 'Fatima Al-Tumi', gender: 'female', specialty: 'jumping', email: 'fatima.tumi@riders.ly' }
  ];

  const libyanTrainees = [
    { name: 'Khaled Ben Salem', gender: 'male', age: 16, level: 'beginner', email: 'khaled.salem@student.ly' },
    { name: 'Amina Al-Akhdar', gender: 'female', age: 17, level: 'intermediate', email: 'amina.akhdar@student.ly' },
    { name: 'Nabil Al-Majbri', gender: 'male', age: 18, level: 'advanced', email: 'nabil.majibri@student.ly' },
    { name: 'Samira El-Mesmari', gender: 'female', age: 19, level: 'beginner', email: 'samira.mesmari@student.ly' },
    { name: 'Adel Al-Khalil', gender: 'male', age: 20, level: 'intermediate', email: 'adel.khalil@student.ly' },
    { name: 'Rania Al-Najjar', gender: 'female', age: 21, level: 'advanced', email: 'rania.najjar@student.ly' },
    { name: 'Faisal El-Badri', gender: 'male', age: 22, level: 'beginner', email: 'faisal.badri@student.ly' },
    { name: 'Noor Al-Hamdi', gender: 'female', age: 23, level: 'intermediate', email: 'noor.hamdi@student.ly' },
    { name: 'Salim Al-Swehli', gender: 'male', age: 24, level: 'advanced', email: 'salim.swehli@student.ly' },
    { name: 'Layla Al-Ramli', gender: 'female', age: 25, level: 'beginner', email: 'layla.ramli@student.ly' }
  ];

  for (let i = 0; i < 10; i++) {
    const trainerData = libyanTrainers[i];
    const traineeData = libyanTrainees[i];

    const trainer = await db.Trainer.create({
      id: uuidv4(),
      ...trainerData,
      role: 'trainer'
    });
    trainers.push(trainer);

    const horse = await db.Horse.create({
      id: uuidv4(),
      name: `Horse ${i + 1}`,
      breed: ['Arabian', 'Thoroughbred', 'Quarter'][i % 3],
      age: 5 + i,
      gender: i % 2 === 0 ? 'female' : 'male',
      color: ['black', 'white', 'brown'][i % 3]
    });
    horses.push(horse);

    const trainee = await db.Trainee.create({
      id: uuidv4(),
      ...traineeData
    });
    trainees.push(trainee);

    const competition = await db.Competition.create({
      id: uuidv4(),
      name: `Libya Cup ${i + 1}`,
      date: new Date(`2025-10-${i < 9 ? '0' + (i + 1) : i + 1}`),
      location: `Tripoli Arena ${i + 1}`,
      type: trainerData.specialty
    });
    competitions.push(competition);

    await Promise.all([
      competition.addTrainer(trainer),
      competition.addHorse(horse),
      competition.addTrainee(trainee)
    ]);

    await db.CompetitionHorseAssignment.create({
      id: uuidv4(),
      competitionId: competition.id,
      horseId: horse.id,
      userId: trainee.id,
      userRole: 'trainee'
    });

    await db.CompetitionHorseAssignment.create({
      id: uuidv4(),
      competitionId: competition.id,
      horseId: horse.id,
      userId: trainer.id,
      userRole: 'trainer'
    });

    await db.Notification.create({
      id: uuidv4(),
      title: `مرحبًا ${traineeData.name}`,
      message: `أهلاً ${traineeData.name}، لقد تم تسجيلك في الدورة بنجاح!`,
      recipientId: trainee.id
    });

    const trainingClass = await db.TrainingClass.create({
      id: uuidv4(),
      title: `دورة تدريبية ${i + 1}`,
      trainerId: trainer.id,
      cost: 100 + i,
      startDate: new Date(`2025-09-${i < 9 ? '0' + (i + 1) : i + 1}`),
      endDate: new Date(`2025-09-${10 + i}`),
      enrolledTrainees: [trainee.id]
    });

    await db.Schedule.create({
      id: uuidv4(),
      classId: trainingClass.id,
      trainerId: trainer.id,
      traineeId: trainee.id,
      horseId: horse.id,
      date: new Date(`2025-09-${10 + i}`),
      status: 'confirmed'
    });
  }

  console.log('✅ Libyan names and entities seeded successfully!');
  await db.sequelize.close();
  process.exit();
}

seedEntities().catch((err) => {
  console.error('❌ Seeding error:', err);
  process.exit(1);
});
