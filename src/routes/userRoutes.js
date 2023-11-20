const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// Create a new user
router.post("/register", UserController.createUser);

// Get all users
router.get("/", UserController.getAllUsers);

// Get user by ID
router.get("/:id", UserController.getUserById);

// Update user by ID
router.put("/:id", UserController.updateUser);

// Delete user by ID
router.delete("/:id", UserController.deleteUser);

module.exports = router;
