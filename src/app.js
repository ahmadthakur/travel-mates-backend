const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares

// Database connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "travel_mates_dev",
});

// Test the database connection
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database: ", error);
    return;
  }
  console.log("Database connected");
});

// Routes
const userRoutes = require("./routes/userRoutes");
// const tripRoutes = require("./routes/tripRoutes");
// const destinationRoutes = require("./routes/destinationRoutes");
// const accommodationRoutes = require("./routes/accommodationRoutes");
// const reviewRoutes = require("./routes/reviewRoutes");

app.use("/api/users", userRoutes);

// app.use("/api/trips", tripRoutes);
// app.use("/api/destinations", destinationRoutes);
// app.use("/api/accommodations", accommodationRoutes);
// app.use("/api/reviews", reviewRoutes);

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
