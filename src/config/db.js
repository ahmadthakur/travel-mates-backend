const mysql = require("mysql2");

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "travel_mates_dev",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Export the pool to be used in other parts of your application
module.exports = pool.promise();
