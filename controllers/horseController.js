// 📄 controllers/horseController.js — Sequelize Version
const { v4: uuidv4 } = require('uuid');
const Horse = require('../models/Horse');

// @desc    Get all horses
// @route   GET /api/horses
exports.getAllHorses = async (req, res) => {
  try {
    const horses = await Horse.findAll();
    res.json(horses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch horses', error: err.message });
  }
};

// @desc    Get a horse by ID
// @route   GET /api/horses/:id
exports.getHorseById = async (req, res) => {
  try {
    const horse = await Horse.findByPk(req.params.id);
    if (!horse) {
      return res.status(404).json({ message: 'Horse not found' });
    }
    res.json(horse);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch horse', error: err.message });
  }
};

// @desc    Create a new horse
// @route   POST /api/horses
exports.createHorse = async (req, res) => {
  const { name, breed, age, gender, height, weight, color, medicalHistory, imageUrl } = req.body;

  if (!name || !breed || !age || !gender) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newHorse = await Horse.create({
      id: uuidv4(),
      name,
      breed,
      age,
      gender,
      height,
      weight,
      color,
      medicalHistory,
      imageUrl,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json(newHorse);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create horse', error: err.message });
  }
};


// @desc    Update a horse
// @route   PUT /api/horses/:id
exports.updateHorse = async (req, res) => {
  try {
    const horse = await Horse.findByPk(req.params.id);
    if (!horse) {
      return res.status(404).json({ message: 'Horse not found' });
    }

    await horse.update({ ...req.body, updatedAt: new Date() });
    res.json(horse);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update horse', error: err.message });
  }
};

// @desc    Delete a horse
// @route   DELETE /api/horses/:id
exports.deleteHorse = async (req, res) => {
  try {
    const horse = await Horse.findByPk(req.params.id);
    if (!horse) {
      return res.status(404).json({ message: 'Horse not found' });
    }

    await horse.destroy();
    res.json({ message: 'Horse deleted', horse });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete horse', error: err.message });
  }
};
