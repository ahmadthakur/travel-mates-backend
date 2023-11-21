const express = require("express");
const mysql = require("mysql2");
const passport = require("./config/passport");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "travel_mates_dev",
});

const sessionStore = new MySQLStore(
  {
    expiration: 86400000, // Session expiration time (in milliseconds), e.g., 24 hours
    createDatabaseTable: true, // Automatically create sessions table in the database
    schema: {
      tableName: "sessions",
      columnNames: {
        session_id: "session_id",
        expires: "expires",
        data: "data",
      },
    },
  },
  db // Pass the MySQL connection pool
);

// Session
app.use(
  session({
    secret: "123", // Use a strong, unique secret for session encryption
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { secure: false }, // Set cookie options here
    // Add additional session configuration options if needed
  })
);

// Session
app.use(passport.initialize());
app.use(passport.session());

// Middlewares

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
