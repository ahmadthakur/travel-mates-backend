// Import required modules
const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const { isAdmin } = require("../middlewares/authMiddleware");

// Define route for admin login
router.post("/admin/login", AdminController.login);

// Define route for admin logout
router.post("/admin/logout", isAdmin, AdminController.logout);

// Define protected route that requires authentication
router.get("/admin/dashboard", isAdmin, AdminController.dashboard);

// Define route to check session
router.get("/admin/check-session", AdminController.checkSession);

// Export the router
module.exports = router;
