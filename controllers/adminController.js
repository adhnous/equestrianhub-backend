const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');

// @desc Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await User.findAll({ where: { role: 'admin' } });
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch admins', error: err.message });
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const admin = await User.findOne({ where: { id: req.params.id, role: 'admin' } });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch admin', error: err.message });
  }
};

exports.createAdmin = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: 'Missing required fields' });

  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email already exists' });

    const newAdmin = await User.create({
      id: uuidv4(),
      username,
      email,
      password,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create admin', error: err.message });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const admin = await User.findOne({ where: { id: req.params.id, role: 'admin' } });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    await admin.update({ ...req.body, role: 'admin', updatedAt: new Date() });
    res.status(200).json({ message: 'Admin updated successfully', admin });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update admin', error: err.message });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await User.findOne({ where: { id: req.params.id, role: 'admin' } });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    await admin.destroy();
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete admin', error: err.message });
  }
};
