const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// // Get all users
router.get("/", UserController.getAllUsers);

//------------------AUTHENTICATION------------------//

// User registration
router.post("/register", UserController.register);

// User login
router.post("/login", UserController.login);

// User logout
router.get("/logout", UserController.logout);

// Protected route (requires authentication)
router.get("/dashboard", UserController.dashboard);

// Check session
router.get("/check-session", UserController.checkSession);

module.exports = router;
