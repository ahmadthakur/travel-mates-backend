// Import required modules
const express = require("express");
const ReviewController = require("../controllers/ReviewController");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");

// Define route to create a new review
router.post("/reviews", isAuthenticated, ReviewController.createReview);

// Define route to get all reviews for a specific accommodation
router.get(
  "/reviews/accommodation/:accommodationId",
  isAuthenticated,
  isAdmin,
  ReviewController.getAccommodationReviews
);

// Define route to update a review by ID
router.put(
  "/reviews/:reviewId",
  isAuthenticated,
  ReviewController.updateReview
);

// Define route to delete a review by ID
router.delete(
  "/reviews/:reviewId",
  isAuthenticated,
  isAdmin,
  ReviewController.deleteReview
);

// Export the router
module.exports = router;
