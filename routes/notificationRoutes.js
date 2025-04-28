const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Create a notification
router.post('/', notificationController.createNotification);

// Get notifications for a user (optional: use ?recipientId=)
router.get('/', notificationController.getAllNotifications);

// Get a notification by ID
router.get('/:id', notificationController.getNotificationById);

// Delete a notification
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
