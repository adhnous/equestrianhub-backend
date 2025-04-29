const express = require('express')
const router = express.Router()
const trainerController = require('../controllers/trainerController')

// @route   GET /api/trainers
router.get('/', trainerController.getAllTrainers)

// @route   GET /api/trainers/:id
router.get('/:id', trainerController.getTrainerById)

// @route   POST /api/trainers
router.post('/', trainerController.createTrainer)

// @route   PUT /api/trainers/:id
router.put('/:id', trainerController.updateTrainer)

// @route   DELETE /api/trainers/:id
router.delete('/:id', trainerController.deleteTrainer)

module.exports = router

