const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const passport = require("../config/passport");

// Create a new user
router.post("/", UserController.createUser);

// Get all users
router.get("/", UserController.getAllUsers);

// Get user by ID
router.get("/:id", UserController.getUserById);

// Update user by ID
router.put("/:id", UserController.updateUser);

// Delete user by ID
router.delete("/:id", UserController.deleteUser);

//------------------AUTHENTICATION------------------//

// User registration
router.post("/register", UserController.register);

// User login
router.post("/login", passport.authenticate("local"), UserController.login);

// User logout
router.get("/logout", UserController.logout);

// Protected route (requires authentication)
router.get("/profile", UserController.profile);

module.exports = router;
