// ✅ Cleaned traineeController.js using Sequelize
const { v4: uuidv4 } = require('uuid');
const Trainee = require('../models/Trainee');

// @desc    Get all trainees
// @route   GET /api/trainees
exports.getAllTrainees = async (req, res) => {
  try {
    const trainees = await Trainee.findAll();
    res.json(trainees);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch trainees', error: err.message });
  }
};

// @desc    Get a trainee by ID
// @route   GET /api/trainees/:id
exports.getTraineeById = async (req, res) => {
  try {
    const trainee = await Trainee.findByPk(req.params.id);
    if (!trainee) return res.status(404).json({ message: 'Trainee not found' });
    res.json(trainee);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch trainee', error: err.message });
  }
};

// @desc    Create a new trainee
// @route   POST /api/trainees
exports.createTrainee = async (req, res) => {
  const { name, email, gender, age, level } = req.body;

  if (!name || !email || !gender || !age || !level) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newTrainee = await Trainee.create({
      id: uuidv4(),
      name,
      email,
      gender,
      age,
      level,
      role: 'trainee', // ✅ added
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json(newTrainee);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create trainee', error: err.message });
  }
};

// @desc    Update a trainee
// @route   PUT /api/trainees/:id
exports.updateTrainee = async (req, res) => {
  try {
    const trainee = await Trainee.findByPk(req.params.id);
    if (!trainee) return res.status(404).json({ message: 'Trainee not found' });

    await trainee.update({ ...req.body, updatedAt: new Date() });
    res.json(trainee);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update trainee', error: err.message });
  }
};

// @desc    Delete a trainee
// @route   DELETE /api/trainees/:id
exports.deleteTrainee = async (req, res) => {
  try {
    const trainee = await Trainee.findByPk(req.params.id);
    if (!trainee) return res.status(404).json({ message: 'Trainee not found' });

    await trainee.destroy();
    res.json({ message: 'Trainee deleted', trainee });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete trainee', error: err.message });
  }
};
