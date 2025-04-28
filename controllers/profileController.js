// Cleaned profileController.js using Sequelize
const User = require('../models/User');
const Trainer = require('../models/Trainer');
const Trainee = require('../models/Trainee');

exports.getProfile = async (req, res) => {
  const { id } = req.params;

  try {
    let user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let profile;
    if (user.role === 'trainer') {
      profile = await Trainer.findByPk(id);
    } else if (user.role === 'trainee') {
      profile = await Trainee.findByPk(id);
    } else {
      profile = user;
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    let user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let updatedProfile;
    if (user.role === 'trainer') {
      const trainer = await Trainer.findByPk(id);
      updatedProfile = await trainer.update(updates);
    } else if (user.role === 'trainee') {
      const trainee = await Trainee.findByPk(id);
      updatedProfile = await trainee.update(updates);
    } else {
      updatedProfile = await user.update(updates);
    }

    res.status(200).json({ message: 'Profile updated successfully', updatedProfile });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
};