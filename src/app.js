const express = require("express");
const { Sequelize } = require("sequelize");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares

// Database connection
const sequelize = new Sequelize({
  dialect: "mysql",
  username: "admin",
  password: "admin",
  database: "travel_mates_dev",
  host: "localhost",
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Models
const User = require("./models/User")(sequelize);
const Trip = require("./models/Trip")(sequelize);
const Destination = require("./models/Destination")(sequelize);
const Accommodation = require("./models/Accommodation")(sequelize);
const Review = require("./models/Review")(sequelize);

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
