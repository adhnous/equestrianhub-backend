// Cleaned trainerController.js using Sequelize
const { v4: uuidv4 } = require('uuid');
const Trainer = require('../models/Trainer');
const User = require('../models/User');

// @desc    Get all trainers (optionally filter by gender)
// @route   GET /api/trainers?gender=Male|Female
exports.getAllTrainers = async (req, res) => {
  try {
    const gender = req.query.gender;
    let trainers = await Trainer.findAll();

    if (gender) {
      trainers = trainers.filter(t => t.gender?.toLowerCase() === gender.toLowerCase());
    }

    res.json(trainers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get trainers', error: error.message });
  }
};

// @desc    Get a trainer by ID
// @route   GET /api/trainers/:id
exports.getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findByPk(req.params.id);
    if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
    res.json(trainer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get trainer', error: error.message });
  }
};

// @desc    Create a new trainer (adds to users with role=trainer)
// @route   POST /api/trainers
exports.createTrainer = async (req, res) => {
  const { username, password, email, gender, specialization } = req.body;

  if (!username || !password || !email || !gender || !specialization) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const existing = await User.findOne({ where: { username } });
    if (existing) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const id = uuidv4();
    await User.create({ id, username, password, email, role: 'trainer' });
    const newTrainer = await Trainer.create({ id, name: username, gender, email, specialty: specialization });

    res.status(201).json(newTrainer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create trainer', error: error.message });
  }
};

// @desc    Update a trainer
// @route   PUT /api/trainers/:id
exports.updateTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByPk(req.params.id);
    if (!trainer) return res.status(404).json({ message: 'Trainer not found' });

    await trainer.update({ ...req.body, updatedAt: new Date() });
    res.json(trainer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update trainer', error: error.message });
  }
};

// @desc    Delete a trainer
// @route   DELETE /api/trainers/:id
exports.deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByPk(req.params.id);
    if (!trainer) return res.status(404).json({ message: 'Trainer not found' });

    await trainer.destroy();
    await User.destroy({ where: { id: req.params.id } });

    res.json({ message: 'Trainer deleted', trainer });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete trainer', error: error.message });
  }
};
