// 📄 routes/competitionRoutes.js
const express = require('express')
const router = express.Router()
const competitionController = require('../controllers/competitionController')

// Basic Competition CRUD
router.get('/', competitionController.getAllCompetitions)
router.get('/:id', competitionController.getCompetitionById)
router.post('/', competitionController.createCompetition)
router.put('/:id', competitionController.updateCompetition)
router.delete('/:id', competitionController.deleteCompetition)

// Assignments
router.post('/:id/trainers', competitionController.assignTrainer)
router.post('/:id/trainees', competitionController.assignTrainee)
router.post('/:id/horses', competitionController.assignHorse) // to general list
router.post('/:id/horses/assign-to-user', competitionController.assignHorseToUser) // ✅ NEW

// Unassign
router.delete('/:id/trainers', competitionController.removeTrainer)
router.delete('/:id/trainees', competitionController.removeTrainee)
router.delete('/:id/horses', competitionController.removeHorse) // general
router.delete('/:id/horses/unassign-from-user', competitionController.removeHorseFromUser) // ✅ NEW

module.exports = router
