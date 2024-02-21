// Import required modules
const express = require("express");
const TripController = require("../controllers/TripController");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");

// Define route to get all of a users trips
router.get("/trips", isAuthenticated, TripController.getAllUserTrips);

// Define a route to get all trips of a user by user ID
router.get("/trips/:userId", isAdmin, TripController.getUserTripsByID);

// Define route to create a new trip
router.post("/trips", isAuthenticated, TripController.createTrip);

// Define route to get a trip by ID
router.get("/trips/:id", isAuthenticated, isAdmin, TripController.getUserTrip);

// Define route to update a trip by ID
router.put("/trips/:id", isAuthenticated, isAdmin, TripController.updateTrip);

// Define route to delete a trip by ID
router.delete(
  "/trips/:id",
  isAuthenticated,
  isAdmin,
  TripController.deleteTrip
);

// Export the router
module.exports = router;
