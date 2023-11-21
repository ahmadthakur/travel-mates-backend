const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("../config/db"); // Adjust the path accordingly

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Query to retrieve user by username
      const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
        username,
      ]);

      if (rows.length === 0) {
        return done(null, false, { message: "Incorrect username." });
      }

      const user = rows[0];

      // Compare passwords
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Query to retrieve user by id
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);

    if (rows.length === 0) {
      return done(null, false);
    }

    const user = rows[0];

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

module.exports = passport;
