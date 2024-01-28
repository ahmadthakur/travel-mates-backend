// Import required modules
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");

// Define route to get all users
router.get("/users", UserController.getAllUsers);

// Define authentication related routes

// Route for user registration
router.post("/users/register", UserController.register);

// Route for user login
router.post("/users/login", UserController.login);

// Route for user logout
router.post("/users/logout", isAuthenticated, UserController.logout);

// Define protected route that requires authentication
router.get("/users/dashboard", isAuthenticated, UserController.dashboard);

// Define route to check session
router.get(
  "/users/check-session",
  isAuthenticated,
  UserController.checkSession
);

// Export the router
module.exports = router;
