// Import the UUID module for generating unique IDs
const { v4: uuidv4 } = require("uuid");
const db = require("../../database/db");

// Function to get all accommodations
exports.getAllAccommodations = async (req, res) => {
  try {
    const selectAccommodationsQuery = "SELECT * FROM accommodations";
    const accommodations = await db.all(selectAccommodationsQuery);
    return res.json(accommodations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to retrieve accommodation by ID
exports.getAccommodationById = async (req, res) => {
  const { id } = req.params;
  try {
    const selectAccommodationQuery =
      "SELECT * FROM accommodations WHERE id = ?";
    const accommodation = await db.get(selectAccommodationQuery, [id]);

    if (!accommodation) {
      return res.status(404).json({ error: "Accommodation not found" });
    }

    return res.json(accommodation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
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
      "INSERT INTO accommodations (id, name, description, price, max_guests, city, country, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

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
exports.updateAccommodation = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, maxGuests, city, country, imageUrl } =
    req.body;

  try {
    const updateAccommodationQuery =
      "UPDATE accommodations SET name = ?, description = ?, price = ?, max_guests = ?, city = ?, country = ?, image_url = ? WHERE id = ?";
    await db.run(updateAccommodationQuery, [
      name,
      description,
      price,
      maxGuests,
      city,
      country,
      imageUrl,
      id,
    ]);
    return res
      .status(200)
      .json({ message: "Accommodation updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to delete an accommodation by ID
exports.deleteAccommodation = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteAccommodationQuery = "DELETE FROM accommodations WHERE id = ?";
    await db.run(deleteAccommodationQuery, [id]);
    return res
      .status(200)
      .json({ message: "Accommodation deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
