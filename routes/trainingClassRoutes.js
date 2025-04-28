const express = require('express');
const router = express.Router();
const trainingClassController = require('../controllers/trainingClassController');

// POST first (specific)
router.post('/enroll', trainingClassController.enrollInClass);
router.post('/unenroll', trainingClassController.unenrollFromClass);

// GET counts and lists
router.get('/enrolled/:traineeId', trainingClassController.getClassesByTrainee);
router.get('/enrolled-count/:traineeId', trainingClassController.getEnrolledClassCount);

// CRUD routes
router.get('/', trainingClassController.getAllTrainingClasses);
router.get('/:id', trainingClassController.getTrainingClassById);
router.post('/', trainingClassController.createTrainingClass);
router.put('/:id', trainingClassController.updateTrainingClass);
router.delete('/:id', trainingClassController.deleteTrainingClass);

module.exports = router;
