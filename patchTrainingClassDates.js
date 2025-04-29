const TrainingClass = require('./models/TrainingClass');
const sequelize = require('./config/database');

async function patchTrainingClassDates() {
  try {
    await sequelize.sync();

    const classes = await TrainingClass.findAll();
    let patched = 0;

    for (const cls of classes) {
      if (!cls.startDate || !cls.endDate) {
        const scheduleDate = new Date(cls.scheduleDate);
        const startDate = scheduleDate;
        const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);

        await cls.update({ startDate, endDate });
        patched++;
        console.log(`✅ Patched: ${cls.title}`);
      }
    }

    if (patched === 0) {
      console.log('✅ All classes already have start/end dates.');
    } else {
      console.log(`🎉 Patched ${patched} training classes successfully.`);
    }

    await sequelize.close();
  } catch (err) {
    console.error('❌ Failed to patch training classes:', err.message);
  }
}

patchTrainingClassDates();
