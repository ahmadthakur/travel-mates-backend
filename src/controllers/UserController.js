const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();

// Create a database connection
const db = new sqlite3.Database("./travel_mates.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the travel_mates database.");
});

// CRUD operations for users

// Create a new user
exports.createUser = (req, res) => {
  try {
    const { username, first_name, last_name, email, password } = req.body;

    const id = uuidv4();

    const insertUserQuery = `
      INSERT INTO users (id, username, first_name, last_name, email, password)
      VALUES (?, ?, ?, ?, ?, ?)`;

    const values = [id, username, first_name, last_name, email, password];

    db.run(insertUserQuery, values, function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res
        .status(201)
        .json({ id, username, first_name, last_name, email });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Retrieve all users
exports.getAllUsers = (req, res) => {
  try {
    const selectUsersQuery = "SELECT * FROM users";

    db.all(selectUsersQuery, [], (err, users) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.json(users);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//------------------AUTHENTICATION------------------//

// User registration
exports.register = (req, res) => {
  // Check if user already exists
  const { username, first_name, last_name, email, password } = req.body;

  const selectUserQuery = "SELECT * FROM users WHERE username = ?";

  db.get(selectUserQuery, [username], async (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (user) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const id = uuidv4();

    const insertUserQuery = `
    INSERT INTO users (id, username, first_name, last_name, email, password)
    VALUES (?, ?, ?, ?, ?, ?)`;

    const values = [id, username, first_name, last_name, email, hashedPassword];

    db.run(insertUserQuery, values, function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res
        .status(201)
        .json({ id, username, first_name, last_name, email });
    });
  });
};

// User Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Query to find user
  const selectUserQuery = "SELECT * FROM users WHERE username = ?";

  db.get(selectUserQuery, [username], async (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Check password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Create session
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    };

    // Respond with user information or any other data
    res
      .status(200)
      .json({ message: "Authentication successful", user: req.session.user });
  });
};

//------------------PROTECTED ROUTES------------------//

// User logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json({ message: "User logged out" });
  });
};

// Protected route (requires authentication)
exports.dashboard = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const selectTripsQuery = "SELECT * FROM trips WHERE id = ?";

  db.all(selectTripsQuery, [req.session.user.id], (err, trips) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const user = {
      id: req.session.user.id,
      username: req.session.user.username,
      first_name: req.session.user.first_name,
      last_name: req.session.user.last_name,
      email: req.session.user.email,
    };

    return res.status(200).json({ message: "You are authorized", user, trips });
  });
};

// Check session
exports.checkSession = (req, res) => {
  if (!req.session.user) {
    return res
      .status(401)
      .json({ message: "Authentication failed", isLoggedIn: false });
  }

  return res
    .status(200)
    .json({ message: "You are authorized", isLoggedIn: true });
};
