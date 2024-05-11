// Middleware to check if the user is authenticated
exports.isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    console.log(`User ${req.session.user.id} is authenticated`);
    next();
  } else {
    console.error("Authentication failed: No user in session");
    res.status(401).json({ error: "Unauthorized: No user in session" });
  }
};

// Middleware to check if the user is an admin
exports.isAdmin = (req, res, next) => {
  if (req.session.admin) {
    console.log(`User ${req.session.admin.id} is an admin`);
    next();
  } else {
    console.error("Authorization failed: User is not an admin");
    res.status(403).json({
      error: "Forbidden: User is not an admin",
    });
  }
};