// Import required modules
const express = require("express");
const DestinationController = require("../controllers/DestinationController");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");

// Define route to get all destinations
router.get(
  "/destinations",

  DestinationController.getAllDestinations
);

// Define route to create a new destination
router.post("/destinations", isAdmin, DestinationController.createDestination);

// Define route to get a destination by ID
router.get("/destinations/:id", DestinationController.getDestinationById);

// Define route to update a destination by ID
router.put(
  "/destinations/:id",
  isAdmin,
  DestinationController.updateDestination
);

// Define route to delete a destination by ID
router.delete(
  "/destinations/:id",
  isAdmin,
  DestinationController.deleteDestination
);

// Export the router
module.exports = router;
