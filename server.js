// Cleaned and Updated version of server.js with Sequelize + /api/seed route
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const sequelize = require('./config/database')
const seedEntities = require('./seedEntities') // 🌟 Import seeding script

const app = express()

// Import routes
const loginRoutes = require('./routes/loginRoutes')
const traineeRoutes = require('./routes/traineeRoutes')
const trainerRoutes = require('./routes/trainerRoutes')
const horseRoutes = require('./routes/horseRoutes')
const scheduleRoutes = require('./routes/scheduleRoutes')
const competitionRoutes = require('./routes/competitionRoutes')
const trainingClassRoutes = require('./routes/trainingClassRoutes')
const profileRoutes = require('./routes/profileRoutes')
const notificationRoutes = require('./routes/notificationRoutes')
const adminRoutes = require('./routes/adminRoutes')
const userRoutes = require('./routes/userRoutes')

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
  next()
})

// Mount API routes
app.use('/api/auth', loginRoutes)
app.use('/api/trainees', traineeRoutes)
app.use('/api/trainers', trainerRoutes)
app.use('/api/horses', horseRoutes)
app.use('/api/schedules', scheduleRoutes)
app.use('/api/competitions', competitionRoutes)
app.use('/api/training-classes', trainingClassRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin/users', userRoutes)
app.use('/api/admins', adminRoutes)

// 🌟 Add temporary /api/seed route
app.post('/api/seed', async (req, res) => {
  try {
    await seedEntities();
    res.status(200).json({
      success: true,
      message: 'Database seeded successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Seeding failed:', error);
    res.status(500).json({
      success: false,
      message: 'Seeding failed',
      error: error.message
    });
  }
});

// Health check & test endpoints
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  })
})

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    storage: 'sqlite/sequelize',
    timestamp: new Date().toISOString()
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  })
})

// Start the server after syncing Sequelize
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🩺 Health check: http://localhost:${PORT}/health`);
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
  process.exit(1);
});
