// Import required modules
const db = require("../../database/db");
const { v4: uuidv4 } = require("uuid");

// Retrieve all trips
exports.getAllUserTrips = (req, res) => {
  const userId = req.session.user.id;
  db.all("SELECT * FROM trips WHERE user_id = ?", [userId], (error, trips) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log(trips);
    return res.json(trips);
  });
};

// Retreive all trips for a specific user by ID
exports.getUserTripsByID = (req, res) => {
  const userId = req.params.userId;
  db.all("SELECT * FROM trips WHERE user_id = ?", [userId], (error, trips) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log(trips);
    return res.json(trips);
  });
};

// Create a new trip
exports.createTrip = (req, res) => {
  const { user_id, destination_id, notes, start_date, end_date } = req.body;
  const id = uuidv4();

  const createTripQuery =
    "INSERT INTO trips (id, user_id, destination_id, notes, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)";
  db.run(
    createTripQuery,
    [id, user_id, destination_id, notes, start_date, end_date],
    (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.status(201).json({ message: "Trip created successfully", id });
    }
  );
};

// Retrieve a trip by ID
exports.getUserTrip = (req, res) => {
  const { id } = req.params;

  db.get("SELECT * FROM trips WHERE id = ?", [id], (error, trip) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    return res.json(trip);
  });
};

// Update a trip
exports.updateTrip = (req, res) => {
  const { id } = req.params;
  const { destination, startDate, endDate } = req.body;

  const updateTripQuery =
    "UPDATE trips SET destination = ?, startDate = ?, endDate = ? WHERE id = ?";
  db.run(updateTripQuery, [destination, startDate, endDate, id], (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json({ message: "Trip updated successfully" });
  });
};

// Delete a trip
exports.deleteTrip = (req, res) => {
  const { id } = req.params;

  const deleteTripQuery = "DELETE FROM trips WHERE id = ?";
  db.run(deleteTripQuery, [id], (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json({ message: "Trip deleted successfully" });
  });
};
