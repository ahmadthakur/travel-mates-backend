const express = require("express");
const NotificationController = require("../controllers/NotificationController");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");

// Get all notifications for the authenticated user by ID
router.get(
  "/notifications",
  isAuthenticated,
  NotificationController.getAllNotifications
);

// Get notifications for user by ID
router.get(
  "/notifications/:userId",
  isAdmin,
  NotificationController.getUserNotifications
);

// Create a new notification for the user by ID
router.post(
  "/notifications/",
  isAdmin,
  NotificationController.createNotification
);

// Delete a specific notification for the user by ID
router.delete(
  "/notifications/:id",
  isAdmin,
  NotificationController.deleteNotification
);

module.exports = router;
