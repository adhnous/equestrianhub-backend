// 📄 sync.js – Syncs and creates all DB tables
const db = require('./models');

db.sequelize.sync({ force: true }).then(() => {
  console.log('✅ Database synced successfully!');
  process.exit();
}).catch(err => {
  console.error('❌ Failed to sync database:', err);
});
