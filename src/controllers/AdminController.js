// Import the database connection from the db.js file in the database directory
const db = require("../../database/db");

//------------------AUTHENTICATION------------------//

// Admin login
exports.login = (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const selectAdminQuery = "SELECT * FROM admin WHERE username = ?";

  db.get(selectAdminQuery, [username], (err, admin) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log(admin);

    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    // Create session
    req.session.admin = {
      id: admin.id,
      username: admin.username,
    };

    // Return the admin data in the response
    return res.json(admin);
  });
};

// Admin logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // If the session is successfully destroyed, return a 200 response
    res.status(200).json({ message: "Admin logged out" });
  });
};

// Protected route for the admin dashboard (requires authentication)
exports.dashboard = (req, res) => {
  // SQL query to select the admin with the provided ID
  const selectAdminQuery = "SELECT * FROM admin WHERE id = ?";

  // Execute the SQL query
  db.get(selectAdminQuery, [req.session.admin.id], (err, admin) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // If there's no admin with the provided ID, return a 404 response
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Prepare the admin data to be returned in the response
    const adminData = {
      id: admin.id,
      username: admin.username,
      // Add other admin fields as needed
    };

    // Return the admin data in the response
    return res
      .status(200)
      .json({ message: "You are authorized", admin: adminData });
  });
};
// Check session
exports.checkSession = (req, res) => {
  // If the admin is in the session (checked by middleware), return a 200 response
  return res.status(200).json({
    message: "You are authorized",
    isLoggedIn: true,
    admin: req.session.admin,
  });
};
