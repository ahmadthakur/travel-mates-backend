const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// Example route
router.get("/", UserController.getAllUsers);

module.exports = router;
