// Import required modules
const db = require("../../database/db");
const { v4: uuidv4 } = require("uuid");

// Retrieve all trips
exports.getAllUserTrips = async (req, res) => {
  try {
    const trips = await db.all("SELECT * FROM trips");
    return res.json(trips);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new trip
exports.createTrip = async (req, res) => {
  const { userId, destination, startDate, endDate } = req.body;
  const id = uuidv4();

  try {
    const createTripQuery =
      "INSERT INTO trips (id, userId, destination, startDate, endDate) VALUES (?, ?, ?, ?, ?)";
    await db.run(createTripQuery, [
      id,
      userId,
      destination,
      startDate,
      endDate,
    ]);
    return res.status(201).json({ message: "Trip created successfully", id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Retrieve a trip by ID
exports.getUserTrip = async (req, res) => {
  const { id } = req.params;

  try {
    const trip = await db.get("SELECT * FROM trips WHERE id = ?", [id]);

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    return res.json(trip);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a trip
exports.updateTrip = async (req, res) => {
  const { id } = req.params;
  const { destination, startDate, endDate } = req.body;

  try {
    const updateTripQuery =
      "UPDATE trips SET destination = ?, startDate = ?, endDate = ? WHERE id = ?";
    await db.run(updateTripQuery, [destination, startDate, endDate, id]);
    return res.status(200).json({ message: "Trip updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a trip
exports.deleteTrip = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteTripQuery = "DELETE FROM trips WHERE id = ?";
    await db.run(deleteTripQuery, [id]);
    return res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
