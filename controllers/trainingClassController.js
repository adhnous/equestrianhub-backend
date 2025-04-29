const TrainingClass = require('../models/TrainingClass');
const { v4: uuidv4 } = require('uuid');

// @desc    Get all training classes
exports.getAllTrainingClasses = async (req, res) => {
  try {
    const classes = await TrainingClass.findAll();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get classes', error: err.message });
  }
};

// @desc    Get a class by ID
exports.getTrainingClassById = async (req, res) => {
  try {
    const found = await TrainingClass.findByPk(req.params.id);
    if (!found) return res.status(404).json({ message: 'Class not found' });
    res.json(found);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get class', error: err.message });
  }
};

// @desc    Create a new class
// @desc    Create a new class
exports.createTrainingClass = async (req, res) => {
  const { title, trainerId, scheduleDate, endDate, cost } = req.body;
  if (!title || !trainerId || !scheduleDate) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const startDate = new Date(scheduleDate); // start = scheduleDate
    const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000); // end = +7 days
    const created = await TrainingClass.create({
      id: uuidv4(),
      title,
      trainerId,
      scheduleDate,
      startDate: new Date(scheduleDate),
      endDate: new Date(endDate),
      cost,
      enrolledTrainees: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create class', error: err.message });
  }
};


// @desc    Update a class
// @desc    Update a training class
exports.updateTrainingClass = async (req, res) => {
  try {
    const found = await TrainingClass.findByPk(req.params.id);
    if (!found) return res.status(404).json({ message: 'Class not found' });

    const { title, scheduleDate, endDate, cost } = req.body;

    if (!title || !scheduleDate || !endDate || cost === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const startDate = new Date(scheduleDate);

    await found.update({
      title,
      scheduleDate,
      startDate,
      endDate: new Date(endDate),
      cost: parseFloat(cost),
      updatedAt: new Date()
    });

    res.json(found);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update class', error: err.message });
  }
};



// @desc    Delete a class
exports.deleteTrainingClass = async (req, res) => {
  try {
    const found = await TrainingClass.findByPk(req.params.id);
    if (!found) return res.status(404).json({ message: 'Class not found' });

    await found.destroy();
    res.json({ message: 'Class deleted', class: found });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete class', error: err.message });
  }
};

// ✅ FIXED: Enroll a trainee in a class
exports.enrollInClass = async (req, res) => {
  const { classId, traineeId } = req.body;
  try {
    const cls = await TrainingClass.findByPk(classId);
    if (!cls) return res.status(404).json({ message: 'Class not found' });

    let trainees = cls.enrolledTrainees;
    if (!Array.isArray(trainees)) {
      trainees = [];
    }

    if (!trainees.includes(traineeId)) {
      trainees.push(traineeId);

      // ✅ THIS WILL FORCE AN UPDATE
      await TrainingClass.update(
        { enrolledTrainees: trainees },
        { where: { id: classId } }
      );
    }

    // Reload the class to return the updated result
    const updatedClass = await TrainingClass.findByPk(classId);
    res.json({ message: 'Enrolled successfully', class: updatedClass });
  } catch (err) {
    res.status(500).json({ message: 'Failed to enroll', error: err.message });
  }
};


// ✅ FIXED: Unenroll a trainee from a class
exports.unenrollFromClass = async (req, res) => {
  const { classId, traineeId } = req.body;
  try {
    const cls = await TrainingClass.findByPk(classId);
    if (!cls) return res.status(404).json({ message: 'Class not found' });

    let trainees = cls.getDataValue('enrolledTrainees');
    if (!Array.isArray(trainees)) trainees = [];

    const updated = trainees.filter(id => id !== traineeId);
    cls.setDataValue('enrolledTrainees', updated); // ✅ force update
    await cls.save();

    res.json({ message: 'Unenrolled successfully', class: cls });
  } catch (err) {
    res.status(500).json({ message: 'Failed to unenroll', error: err.message });
  }
};

// @desc    Get all classes a trainee is enrolled in
exports.getClassesByTrainee = async (req, res) => {
  try {
    const all = await TrainingClass.findAll();
    const enrolled = all.filter(c =>
      Array.isArray(c.enrolledTrainees) && c.enrolledTrainees.includes(req.params.traineeId)
    );
    res.json(enrolled);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get enrolled classes', error: err.message });
  }
};

// @desc    Get count of classes a trainee is enrolled in
exports.getEnrolledClassCount = async (req, res) => {
  try {
    const all = await TrainingClass.findAll();
    const count = all.filter(c =>
      Array.isArray(c.enrolledTrainees) && c.enrolledTrainees.includes(req.params.traineeId)
    ).length;
    res.json({ traineeId: req.params.traineeId, count });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get enrolled count', error: err.message });
  }
};
