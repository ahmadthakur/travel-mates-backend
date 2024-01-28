// ReviewController.js
const { v4: uuidv4 } = require("uuid");

// Import the database connection from the db.js file in the database directory
const db = require("../../database/db");

// CRUD operations for destinations

// Create a new review
exports.createReview = (req, res) => {
  const { userId, accommodationId, rating, comment } = req.body;

  // Check if user is logged in
  if (!req.session.user || req.session.user.id !== userId) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const insertReviewQuery =
    "INSERT INTO reviews (userId, accommodationId, rating, comment) VALUES (?, ?, ?, ?)";

  db.run(
    insertReviewQuery,
    [userId, accommodationId, rating, comment],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.status(201).json({ message: "Review created successfully" });
    }
  );
};

// Fetch all reviews for a specific accommodation
exports.getAccommodationReviews = (req, res) => {
  const { accommodationId } = req.params;

  // check if user is admin
  if (!req.session.admin) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const selectReviewsQuery =
    "SELECT * FROM reviews WHERE accommodationId = ? ORDER BY createdAt DESC";

  db.all(selectReviewsQuery, [accommodationId], (err, reviews) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(reviews);
  });
};

// Update a review
exports.updateReview = (req, res) => {
  const { userId, reviewId, rating, comment } = req.body;

  // Check if user is logged in and trying to update their own review
  if (!req.session.user || req.session.user.id !== userId) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const updateReviewQuery =
    "UPDATE reviews SET rating = ?, comment = ? WHERE id = ? AND userId = ?";

  db.run(
    updateReviewQuery,
    [rating, comment, reviewId, userId],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.status(200).json({ message: "Review updated successfully" });
    }
  );
};

// Delete a review
exports.deleteReview = (req, res) => {
  const { reviewId } = req.params;

  // Check if user is logged in and trying to delete their own review, or if admin is logged in
  if (
    !(req.session.user && req.session.user.id === userId) &&
    !req.session.admin
  ) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const deleteReviewQuery = "DELETE FROM reviews WHERE id = ?";

  db.run(deleteReviewQuery, [reviewId], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json({ message: "Review deleted successfully" });
  });
};
