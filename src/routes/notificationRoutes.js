const express = require("express");
const NotificationController = require("../controllers/NotificationController");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");

// Get all notifications for the authenticated user
router.get(
  "/notifications",
  isAuthenticated,
  isAdmin,
  NotificationController.getUserNotifications
);

// Create a new notification for the authenticated user
router.post(
  "/notifications",
  isAdmin,
  NotificationController.createNotification
);

// Delete a specific notification for the authenticated user
router.delete(
  "/notifications/:id",
  isAdmin,
  NotificationController.deleteNotification
);

module.exports = router;
