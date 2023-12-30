const { v4: uuidv4 } = require("uuid");
const sqlite3 = require("sqlite3").verbose();

// Create a database connection
const db = new sqlite3.Database("./travel_mates.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the travel_mates database.");
});

// CRUD operations for destinations

// Retrieve all destinations
exports.getAllDestinations = (req, res) => {
  try {
    const selectDestinationsQuery = "SELECT * FROM destinations";

    db.all(selectDestinationsQuery, [], (err, destinations) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.json(destinations);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Retrieve destination by ID
exports.getDestinationById = (req, res) => {
  const { id } = req.params;

  try {
    const selectDestinationQuery = "SELECT * FROM destinations WHERE id = ?";

    db.get(selectDestinationQuery, [id], (err, destination) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (!destination) {
        return res.status(404).json({ error: "Destination not found" });
      }

      return res.json(destination);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new destination
exports.createDestination = (req, res) => {
  try {
    const {
      name,
      city,
      country,
      description,
      attractions,
      recommended_activities,
      image_url,
    } = req.body;

    const id = uuidv4();

    const insertDestinationQuery = `
      INSERT INTO destinations (id, name, city, country, description, attractions, recommended_activities, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      id,
      name,
      city,
      country,
      description,
      attractions,
      recommended_activities,
      image_url,
    ];

    db.run(insertDestinationQuery, values, function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.status(201).json({
        id,
        name,
        city,
        country,
        description,
        attractions,
        recommended_activities,
        image_url,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
