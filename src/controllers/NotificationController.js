// NotificationController.js
const { v4: uuidv4 } = require("uuid");

// Import the database connection from the db.js file in the database directory
const db = require("../../database/db");

// CRUD operations for notifications

// Create a new notification
exports.createNotification = (req, res) => {
  // check if user is admin
  if (!req.session.admin) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const { userId, message } = req.body;

  const insertNotificationQuery =
    "INSERT INTO notifications (userId, message) VALUES (?, ?)";

  db.run(insertNotificationQuery, [userId, message], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res
      .status(201)
      .json({ message: "Notification created successfully" });
  });
};

// Fetch all notifications for a user
exports.getUserNotifications = (req, res) => {
  // check if user is admin
  if (!req.session.admin) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const { userId } = req.params;

  const selectNotificationsQuery =
    "SELECT * FROM notifications WHERE userId = ? ORDER BY createdAt DESC";

  db.all(selectNotificationsQuery, [userId], (err, notifications) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(notifications);
  });
};
