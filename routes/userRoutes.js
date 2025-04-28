const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /api/users → all users (admin + trainers + trainees)
router.get('/', userController.getAllUsers);

// GET /api/users/:id → get one user by ID from any table
router.get('/:id', userController.getUserById);

module.exports = router;
