// Import required modules
const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const cors = require("cors");
require("dotenv").config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for cross-origin requests
app.use(
  cors({
    origin: "http://localhost:3000", // replace with your frontend app's URL
    credentials: true,
  })
);

// Use body parser middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure session store options
const fileStoreOptions = {};

// Use session middleware for session management
app.use(
  session({
    store: new FileStore(fileStoreOptions),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Note that the `secure` option should be true if you serve your website over HTTPS
  })
);

// Import routes
const userRoutes = require("./routes/userRoutes");
const tripRoutes = require("./routes/tripRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const accommodationRoutes = require("./routes/accommodationRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Use imported routes
app.use("/users", userRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/accommodations", accommodationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/admin", adminRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
