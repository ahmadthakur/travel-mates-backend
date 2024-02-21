const { v4: uuidv4 } = require("uuid");
const db = require("../../database/db");

// Function to retrieve all destinations
exports.getAllDestinations = (req, res) => {
  const selectDestinationsQuery = "SELECT * FROM destinations";

  db.all(selectDestinationsQuery, [], (err, destinations) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.json(destinations);
  });
};

// Function to create a new destination
exports.createDestination = (req, res) => {
  const {
    name,
    country,
    city,
    description,
    attractions,
    recommended_activities,
    image_url,
    latitude,
    longitude,
  } = req.body;

  const id = uuidv4();
  const insertDestinationQuery = `
    INSERT INTO destinations (id, name, city, country, description, attractions, recommended_activities, image_url, latitude, longitude)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    insertDestinationQuery,
    [
      id,
      name,
      country,
      city,
      description,
      attractions,
      recommended_activities,
      image_url,
      latitude,
      longitude,
    ],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      return res
        .status(201)
        .json({ message: "Destination created successfully", id });
    }
  );
};

// Function to retrieve destination by ID
exports.getDestinationById = (req, res) => {
  const { id } = req.params;
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
};

// Function to update a destination
exports.updateDestination = (req, res) => {
  const { id } = req.body.id;
  const {
    name,
    country,
    city,
    description,
    attractions,
    recommended_activities,
    image_url,
    latitude,
    longitude,
  } = req.body;

  const updateDestinationQuery = `
    UPDATE destinations
    SET name = ?, country = ?, city = ?, description = ?, attractions = ?, recommended_activities = ?, image_url = ?, latitude = ?, longitude = ?
    WHERE id = ?
  `;

  db.run(
    updateDestinationQuery,
    [
      name,
      country,
      city,
      description,
      attractions,
      recommended_activities,
      image_url,
      latitude,
      longitude,
      id,
    ],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      return res
        .status(200)
        .json({ message: "Destination updated successfully" });
    }
  );
};

// Function to delete a destination by ID
exports.deleteDestination = (req, res) => {
  const { id } = req.params;
  const deleteDestinationQuery = "DELETE FROM destinations WHERE id = ?";

  db.run(deleteDestinationQuery, [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res
      .status(200)
      .json({ message: "Destination deleted successfully" });
  });
};
