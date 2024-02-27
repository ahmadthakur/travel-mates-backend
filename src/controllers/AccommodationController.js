// Import the UUID module for generating unique IDs
const { v4: uuidv4 } = require("uuid");
const db = require("../../database/db");

// Function to get all accommodations
exports.getAllAccommodations = (req, res) => {
  const selectAccommodationsQuery = "SELECT * FROM accommodations";

  db.all(selectAccommodationsQuery, (error, accommodations) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log(accommodations);
    return res.json(accommodations);
  });
};

// Function to retrieve accommodation by ID
exports.getAccommodationById = (req, res) => {
  const { id } = req.params;
  const selectAccommodationQuery = "SELECT * FROM accommodations WHERE id = ?";

  db.get(selectAccommodationQuery, [id], (error, accommodation) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!accommodation) {
      return res.status(404).json({ error: "Accommodation not found" });
    }

    return res.json(accommodation);
  });
};

// Function to create a new accommodation
exports.createAccommodation = (req, res) => {
  // check if user is admin
  if (!req.session.admin) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const { name, description, price, maxGuests, city, country, imageUrl } =
    req.body;
  const id = uuidv4();

  try {
    const insertAccommodationQuery =
      "INSERT INTO accommodations (id, name, description, price, maxGuests, city, country, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    db.run(
      insertAccommodationQuery,
      [id, name, description, price, maxGuests, city, country, imageUrl],
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        return res
          .status(201)
          .json({ message: "Accommodation created successfully" });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to update a new accommodation by ID
exports.updateAccommodation = (req, res) => {
  const { id } = req.params;
  const { name, description, price, maxGuests, city, country, imageUrl } =
    req.body;

  const updateAccommodationQuery =
    "UPDATE accommodations SET name = ?, description = ?, price = ?, maxGuests = ?, city = ?, country = ?, imageUrl = ? WHERE id = ?";

  db.run(
    updateAccommodationQuery,
    [name, description, price, maxGuests, city, country, imageUrl, id],
    (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      return res
        .status(200)
        .json({ message: "Accommodation updated successfully" });
    }
  );
};

// Function to delete an accommodation by ID
exports.deleteAccommodation = (req, res) => {
  const { id } = req.params;

  const deleteAccommodationQuery = "DELETE FROM accommodations WHERE id = ?";

  db.run(deleteAccommodationQuery, [id], (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res
      .status(200)
      .json({ message: "Accommodation deleted successfully" });
  });
};
