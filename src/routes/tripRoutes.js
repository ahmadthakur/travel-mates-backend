const express = require("express");
const TripController = require("../controllers/TripController");
const router = express.Router();

// Create a new trip
router.post("/", TripController.createTrip);

// Get all trips
router.get("/", TripController.getAllTrips);

// Get trip by ID
router.get("/:id", TripController.getTripById);

// Update trip by ID
router.put("/:id", TripController.updateTrip);

// Delete trip by ID
router.delete("/:id", TripController.deleteTrip);

module.exports = router;
