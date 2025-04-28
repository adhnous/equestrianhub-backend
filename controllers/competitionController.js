// 📄 controllers/competitionController.js
const { v4: uuidv4 } = require('uuid');
const db = require('../models');
const Competition = db.Competition;
const Trainer = db.Trainer;
const Horse = db.Horse;
const Trainee = db.Trainee;

// @desc    Get all competitions
// @route   GET /api/competitions
const CompetitionHorseAssignment = db.CompetitionHorseAssignment;

exports.getAllCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.findAll({
      include: [
        { model: Trainer, as: 'Trainers' },
        { model: Horse, as: 'Horses' },
        { model: Trainee, as: 'Trainees' },
        { model: CompetitionHorseAssignment, as: 'CompetitionHorseAssignments' } // ✅ ADD THIS
      ]
    });
    res.json(competitions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch competitions', error: err.message });
  }
};

// @desc    Get a competition by ID
// @route   GET /api/competitions/:id
exports.getCompetitionById = async (req, res) => {
  try {
    const competition = await Competition.findByPk(req.params.id, {
      include: [
        { model: Trainer, as: 'Trainers' },
        { model: Horse, as: 'Horses' },
        { model: Trainee, as: 'Trainees' }
      ]
    });
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }
    res.json(competition);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch competition', error: err.message });
  }
};

// @desc    Create a competition
// @route   POST /api/competitions
exports.createCompetition = async (req, res) => {
  const { name, date, location, type } = req.body;

  if (!name || !date || !location || !type) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newCompetition = await Competition.create({ name, date, location, type });
    res.status(201).json(newCompetition);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create competition', error: err.message });
  }
};

// @desc    Update a competition
// @route   PUT /api/competitions/:id
exports.updateCompetition = async (req, res) => {
  try {
    const competition = await Competition.findByPk(req.params.id);
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }

    await competition.update({ ...req.body });
    res.json(competition);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update competition', error: err.message });
  }
};

// @desc    Delete a competition
// @route   DELETE /api/competitions/:id
exports.deleteCompetition = async (req, res) => {
  try {
    const competition = await Competition.findByPk(req.params.id);
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }

    await competition.destroy();
    res.json({ message: 'Competition deleted', competition });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete competition', error: err.message });
  }
};

// @desc    Assign a trainer to a competition
// @route   POST /api/competitions/:id/trainers
exports.assignTrainer = async (req, res) => {
  try {
    const competition = await Competition.findByPk(req.params.id);
    const trainer = await Trainer.findByPk(req.body.trainerId);

    if (!competition || !trainer) {
      return res.status(404).json({ message: 'Competition or Trainer not found' });
    }

    await competition.addTrainer(trainer);
    res.json({ message: 'Trainer assigned successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to assign trainer', error: err.message });
  }
};

// @desc    Unassign a trainer from a competition
// @route   DELETE /api/competitions/:id/trainers
exports.removeTrainer = async (req, res) => {
  try {
    const competition = await Competition.findByPk(req.params.id);
    const trainer = await Trainer.findByPk(req.body.trainerId);

    if (!competition || !trainer) {
      return res.status(404).json({ message: 'Competition or Trainer not found' });
    }

    await competition.removeTrainer(trainer);
    res.json({ message: 'Trainer unjoined successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to unjoin trainer', error: err.message });
  }
};

// @desc    Assign a horse to a competition
// @route   POST /api/competitions/:id/horses
exports.assignHorse = async (req, res) => {
  try {
    const competition = await Competition.findByPk(req.params.id);
    const horse = await Horse.findByPk(req.body.horseId);

    if (!competition || !horse) {
      return res.status(404).json({ message: 'Competition or Horse not found' });
    }

    await competition.addHorse(horse);
    res.json({ message: 'Horse assigned successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to assign horse', error: err.message });
  }
};

// @desc    Assign a trainee to a competition
// @route   POST /api/competitions/:id/trainees
exports.assignTrainee = async (req, res) => {
  try {
    const competition = await Competition.findByPk(req.params.id);
    const trainee = await Trainee.findByPk(req.body.traineeId);

    if (!competition || !trainee) {
      return res.status(404).json({ message: 'Competition or Trainee not found' });
    }

    await competition.addTrainee(trainee);
    res.json({ message: 'Trainee assigned successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to assign trainee', error: err.message });
  }
};

// @desc    Unassign a trainee from a competition
// @route   DELETE /api/competitions/:id/trainees
exports.removeTrainee = async (req, res) => {
  try {
    const competition = await Competition.findByPk(req.params.id);
    const trainee = await Trainee.findByPk(req.body.traineeId);

    if (!competition || !trainee) {
      return res.status(404).json({ message: 'Competition or Trainee not found' });
    }

    await competition.removeTrainee(trainee);
    res.json({ message: 'Trainee unjoined successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to unjoin trainee', error: err.message });
  }
};
// @desc    Unassign a horse from a competition
// @route   DELETE /api/competitions/:id/horses
exports.removeHorse = async (req, res) => {
  try {
    const competition = await Competition.findByPk(req.params.id);
    const horse = await Horse.findByPk(req.body.horseId);

    if (!competition || !horse) {
      return res.status(404).json({ message: 'Competition or Horse not found' });
    }

    await competition.removeHorse(horse);
    res.json({ message: 'Horse unassigned successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to unassign horse', error: err.message });
  }
};
exports.assignHorseToUser = async (req, res) => {
  try {
    const { horseId, userId, userRole } = req.body
    const { id: competitionId } = req.params

    if (!horseId || !userId || !userRole) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const record = await db.CompetitionHorseAssignment.create({
      competitionId,
      horseId,
      userId,
      userRole
    })

    res.status(201).json({ success: true, message: 'Horse assigned to user', record })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Assignment failed', error: err.message })
  }
};


exports.assignHorseToUser = async (req, res) => {
  try {
    const { horseId, userId, userRole } = req.body
    const { id: competitionId } = req.params

    if (!horseId || !userId || !userRole) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const record = await db.CompetitionHorseAssignment.create({
      competitionId,
      horseId,
      userId,
      userRole
    })

    res.status(201).json({ success: true, message: 'Horse assigned to user', record })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Assignment failed', error: err.message })
  }
};
// Unassign horse from user in a specific competition
exports.removeHorseFromUser = async (req, res) => {
  try {
    const { horseId, userId } = req.body;
    const competitionId = req.params.id;

    if (!horseId || !userId || !competitionId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const deleted = await db.CompetitionHorseAssignment.destroy({
      where: {
        horseId,
        userId,
        competitionId
      }
    });

    if (deleted === 0) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.json({ success: true, message: 'Horse unassigned from user' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to unassign', error: err.message });
  }
};

