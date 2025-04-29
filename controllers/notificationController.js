// Cleaned notificationController.js using Sequelize
const Notification = require('../models/Notification');
const { v4: uuidv4 } = require('uuid');

// @desc    Get all notifications (optionally filter by recipientId)
// @route   GET /api/notifications?recipientId=
exports.getAllNotifications = async (req, res) => {
  try {
    const { recipientId } = req.query;
    const where = recipientId ? { recipientId } : {};
    const notifications = await Notification.findAll({ where });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get notifications', error: err.message });
  }
};

// @desc    Get a notification by ID
// @route   GET /api/notifications/:id
exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get notification', error: err.message });
  }
};

// @desc    Create a new notification
// @route   POST /api/notifications
exports.createNotification = async (req, res) => {
  try {
    const { title, message, recipientId } = req.body;

    if (!title || !message) {
      return res.status(400).json({ message: 'Title and message are required' });
    }

    const newNotification = await Notification.create({
      id: uuidv4(),
      title,
      message,
      recipientId,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json(newNotification);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create notification', error: err.message });
  }
};

// @desc    Delete a notification
// @route   DELETE /api/notifications/:id
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });

    await notification.destroy();
    res.json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete notification', error: err.message });
  }
};