// ✅ Updated userController.js to fetch users from Trainer, Trainee, and Admin models
const Trainer = require('../models/Trainer');
const Trainee = require('../models/Trainee');
const User = require('../models/User'); // only for admins
const { v4: uuidv4 } = require('uuid');

// @desc    Get all users (from Trainer, Trainee, and Admin)
// @route   GET /api/users
exports.getAllUsers = async (req, res) => {
  try {
    const [trainers, trainees, admins] = await Promise.all([
      Trainer.findAll(),
      Trainee.findAll(),
      User.findAll() // admins only
    ]);

    const allUsers = [
      ...trainers.map(t => ({ ...t.toJSON(), role: 'trainer' })),
      ...trainees.map(t => ({ ...t.toJSON(), role: 'trainee' })),
      ...admins.map(a => ({ ...a.toJSON(), role: 'admin' }))
    ];

    res.json(allUsers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
};

// @desc    Get a user by ID from any table
// @route   GET /api/users/:id
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [trainer, trainee, admin] = await Promise.all([
      Trainer.findByPk(id),
      Trainee.findByPk(id),
      User.findByPk(id)
    ]);

    const user = trainer || trainee || admin;
    if (!user) return res.status(404).json({ message: 'User not found' });

    const role = trainer ? 'trainer' : trainee ? 'trainee' : 'admin';
    res.json({ ...user.toJSON(), role });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user', error: err.message });
  }
};
