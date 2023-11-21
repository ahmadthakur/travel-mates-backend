const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const passport = require("passport");

// CRUD operations for users

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const id = uuidv4();

    const insertUserQuery = `
      INSERT INTO users (id, username, email, password, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;

    const values = [id, username, email, password];

    await db.query(insertUserQuery, values);

    return res.status(201).json({ id, username, email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Retrieve all users
exports.getAllUsers = async (req, res) => {
  try {
    const selectUsersQuery = "SELECT * FROM users";

    const [users] = await db.query(selectUsersQuery);

    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Retrieve a user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const selectUserQuery = "SELECT * FROM users WHERE id = ?";

    const [user] = await db.query(selectUserQuery, [id]);

    if (!user || user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const updateUserQuery = `
      UPDATE users
      SET username = ?, email = ?, password = ?, accountUpdatedAt = CURRENT_TIMESTAMP
      WHERE id = ?`;

    const values = [username, email, password, id];

    const [updatedRowsCount] = await db.query(updateUserQuery, values);

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ id, username, email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUserQuery = "DELETE FROM users WHERE id = ?";

    const [deletedRowsCount] = await db.query(deleteUserQuery, [id]);

    if (deletedRowsCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(204).send(); // No content for a successful deletion
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//------------------AUTHENTICATION------------------//

// User registration
exports.register = async (req, res) => {
  // Check if user already exists
  const { username, email, password } = req.body;

  const selectUserQuery = "SELECT * FROM users WHERE username = ?";
  const [users] = await db.query(selectUserQuery, [username]);

  if (users && users.length > 0) {
    return res.status(409).json({ error: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const id = uuidv4();

  const insertUserQuery = `
    INSERT INTO users (id, username, email, password, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`; // CURRENT_TIMESTAMP is a MySQL function

  const values = [id, username, email, hashedPassword];

  await db.query(insertUserQuery, values);

  return res.status(201).json({ id, username, email });
};

// User login
exports.login = async (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Manually log in the user
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }

      // Respond with user information or any other data
      res.status(200).json({ message: "Authentication successful", user });
    });
  })(req, res);
};

// User logout
exports.logout = async (req, res) => {
  req.logout();
  res.status(200).json({ message: "User logged out" });
};

// Protected route (requires authentication)
exports.profile = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  console.log("req.user: ", req.user);
  return res.status(200).json({ message: "You are authorized" });
};
