// Cleaned scheduleController.js using Sequelize
const Schedule = require('../models/Schedule');
const { v4: uuidv4 } = require('uuid');

// @desc    Get all schedules
// @route   GET /api/schedules
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch schedules', error: err.message });
  }
};

// @desc    Get a schedule by ID
// @route   GET /api/schedules/:id
exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id);
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get schedule', error: err.message });
  }
};

// @desc    Create a new schedule
// @route   POST /api/schedules
exports.createSchedule = async (req, res) => {
  const { classId, trainerId, traineeId, date, status } = req.body;
  if (!classId || !trainerId || !traineeId || !date || !status) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const created = await Schedule.create({
      id: uuidv4(),
      classId,
      trainerId,
      traineeId,
      date,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create schedule', error: err.message });
  }
};

// @desc    Update a schedule
// @route   PUT /api/schedules/:id
exports.updateSchedule = async (req, res) => {
  try {
    const found = await Schedule.findByPk(req.params.id);
    if (!found) return res.status(404).json({ message: 'Schedule not found' });

    await found.update({ ...req.body, updatedAt: new Date() });
    res.json(found);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update schedule', error: err.message });
  }
};

// @desc    Delete a schedule
// @route   DELETE /api/schedules/:id
exports.deleteSchedule = async (req, res) => {
  try {
    const found = await Schedule.findByPk(req.params.id);
    if (!found) return res.status(404).json({ message: 'Schedule not found' });

    await found.destroy();
    res.json({ message: 'Schedule deleted', schedule: found });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete schedule', error: err.message });
  }
};
