// routes/loginRoutes.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/login', loginController.loginUser);
router.post('/register', loginController.registerUser);

module.exports = router;
