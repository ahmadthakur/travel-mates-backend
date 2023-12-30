const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // replace with your frontend app's URL
    credentials: true,
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const fileStoreOptions = {};

app.use(
  session({
    store: new FileStore(fileStoreOptions),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Note that the `secure` option should be true if you serve your website over HTTPS
  })
);

// Routes
const userRoutes = require("./routes/userRoutes");
// const tripRoutes = require("./routes/tripRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
// const accommodationRoutes = require("./routes/accommodationRoutes");
// const reviewRoutes = require("./routes/reviewRoutes");

app.use("/users", userRoutes);
app.use("/api/destinations", destinationRoutes);
// app.use("/api/trips", tripRoutes);

// app.use("/api/accommodations", accommodationRoutes);
// app.use("/api/reviews", reviewRoutes);

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
