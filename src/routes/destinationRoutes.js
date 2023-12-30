const express = require("express");
const DestinationController = require("../controllers/DestinationController");
const router = express.Router();

// Get all destinations
router.get("/", DestinationController.getAllDestinations);

// Create a new destination
router.post("/create", DestinationController.createDestination);

// Get destination by ID
router.get("/:id", DestinationController.getDestinationById);

// // Update destination by ID
// router.put("/:id", DestinationController.updateDestination);

// // Delete destination by ID
// router.delete("/:id", DestinationController.deleteDestination);

module.exports = router;
