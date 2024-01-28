// Import required modules
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

// Import the database connection from the db.js file in the database directory
const db = require("../../database/db");

// Retrieve all users
exports.getAllUsers = (req, res) => {
  const selectUsersQuery = "SELECT * FROM users";
  db.all(selectUsersQuery, [], (err, users) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log(users);
    return res.json(users);
  });
};

//------------------AUTHENTICATION------------------//

// User registration
exports.register = (req, res) => {
  const { username, first_name, last_name, email, password } = req.body;

  if (!username || !first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const id = uuidv4();
    const insertUserQuery = `
      INSERT INTO users (id, username, first_name, last_name, email, password)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(
      insertUserQuery,
      [id, username, first_name, last_name, email, hashedPassword],
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        return res.status(201).json({ message: "User created successfully" });
      }
    );
  });
};

// User login
exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const selectUserQuery = "SELECT * FROM users WHERE username = ?";
  db.get(selectUserQuery, [username], async (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

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
  return res.status(200).json({
    message: "You are authorized",
    isLoggedIn: true,
    user: req.session.user,
  });
};
