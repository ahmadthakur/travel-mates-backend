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
router.get("/accommodations", AccommodationController.getAllAccommodations);

// Define route to get a specific accommodation by ID
router.get(
  "/accommodations/:id",
  isAuthenticated,
  isAdmin,
  AccommodationController.getAccommodationById
);

// Define route to update an accommodation by ID
router.put(
  "/accommodations/:id",
  isAdmin,
  AccommodationController.updateAccommodation
);

// Define route to delete an accommodation by ID
router.delete(
  "/accommodations/:id",
  isAdmin,
  AccommodationController.deleteAccommodation
);

// Get accommodation by city
router.get(
  "/accommodations/:city",
  isAuthenticated,
  AccommodationController.getAccommodationByCity
);

// Export the router
module.exports = router;
