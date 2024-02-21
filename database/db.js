// db.js

// Import sqlite3 module with verbose mode for more detailed stack trace
const sqlite3 = require("sqlite3").verbose();

// Create a database connection
// The verbose() method is used to get more detailed stack traces from database errors
// "./travel_mates.db" is the path to the SQLite database file

const path = require("path");

const dbPath = path.resolve(__dirname, "./travel_mates.db");

const db = new sqlite3.Database(dbPath, (err) => {
  // If there is an error when connecting to the database, log the error message
  if (err) {
    console.error(err.message);
  }
  // If the connection is successful, log a success message
  console.log("Connected to the travel_mates database.");
});

// Export the database connection object to be used in other modules
module.exports = db;
