// Import the database connection from the db.js file in the database directory
const db = require("../../database/db");

//------------------AUTHENTICATION------------------//

// Admin login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const selectAdminQuery = "SELECT * FROM admin WHERE username = ?";
    const admin = await db.get(selectAdminQuery, [username]);

    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    // Create session
    req.session.admin = admin;

    // Return the admin data in the response
    return res.json(admin);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
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
exports.dashboard = async (req, res) => {
  try {
    // SQL query to select the admin with the provided ID
    const selectAdminQuery = "SELECT * FROM admin WHERE id = ?";

    // Execute the SQL query
    const admin = await db.get(selectAdminQuery, [req.session.admin.id]);

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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Check session
exports.checkSession = (req, res) => {
  const admin = {
    id: req.session.admin.id,
    username: req.session.admin.username,
    // Add other admin fields as needed
  };
  // If the admin is in the session (checked by middleware), return a 200 response
  return res.status(200).json({
    message: "You are authorized",
    isLoggedIn: true,
    admin: req.session.admin,
  });
};
