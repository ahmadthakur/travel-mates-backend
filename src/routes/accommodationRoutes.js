// Import required modules
const express = require("express");
const AccommodationController = require("../controllers/AccommodationController");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");

// Define route to create a new accommodation
router.post(
  "/accommodations",
  isAdmin,
  AccommodationController.createAccommodation
);

// Define route to get all accommodations
router.get(
  "/accommodations",
  isAuthenticated,
  isAdmin,
  AccommodationController.getAllAccommodations
);

// Define route to get a specific accommodation by ID
router.get(
  "/accommodations/:accommodationId",
  isAuthenticated,
  isAdmin,
  AccommodationController.getAccommodationById
);

// Define route to update an accommodation by ID
router.put(
  "/accommodations/:accommodationId",
  isAdmin,
  AccommodationController.updateAccommodation
);

// Define route to delete an accommodation by ID
router.delete(
  "/accommodations/:accommodationId",
  isAdmin,
  AccommodationController.deleteAccommodation
);

// Export the router
module.exports = router;
