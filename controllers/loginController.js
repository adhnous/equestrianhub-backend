const Trainer = require('../models/Trainer');
const Trainee = require('../models/Trainee');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

// ✅ Login
exports.loginUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    let user = null;

    if (role === 'admin') {
      user = await User.findOne({ where: { username, password, role: 'admin' } });
    } else if (role === 'trainer') {
      user = await Trainer.findOne({ where: { username, password } });
    } else if (role === 'trainee') {
      user = await Trainee.findOne({ where: { username, password } });
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      id: user.id,
      username: user.username,
      role,
      email: user.email || null
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// ✅ Register
exports.registerUser = async (req, res) => {
  const { username, password, email, role, gender, age, level, specialty } = req.body;

  if (!username || !password || !email || !role) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    let exists;

    if (role === 'trainer') {
      exists = await Trainer.findOne({ where: { username } });
    } else if (role === 'trainee') {
      exists = await Trainee.findOne({ where: { username } });
    } else if (role === 'admin') {
      exists = await User.findOne({ where: { username, role: 'admin' } });
    }

    if (exists) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const baseData = {
      id: uuidv4(),
      username,
      password,
      email,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    let newUser;

    if (role === 'trainer') {
      newUser = await Trainer.create({
        ...baseData,
        gender,
        specialty: specialty || null
      });
    } else if (role === 'trainee') {
      newUser = await Trainee.create({
        ...baseData,
        gender,
        age: age || null,
        level: level || null
      });
    } else if (role === 'admin') {
      newUser = await User.create({
        ...baseData,
        role: 'admin'
      });
    } else {
      return res.status(400).json({ message: 'Invalid role for registration' });
    }

    res.status(201).json({
      message: 'Registration successful',
      id: newUser.id,
      role,
      username
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};
