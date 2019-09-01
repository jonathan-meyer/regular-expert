require("dotenv").config();

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const app = express()
  // middlewares
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(morgan("tiny"))

  // setup passport
  .use(passport.initialize())
  .use(passport.session())

  // routes
  .use(require("./routes"));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// Local Strategy for Passport
passport.use(
  new LocalStrategy(function(username, password, done) {
    // eslint-disable-next-line no-undef
    db.User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      
      return done(null, user);
    });
  })
);

// static files
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "..", "build")));
}

// connect to mongo DB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
});

// start server
app.listen(PORT, () => {
  console.log(`🌎 ==> HTML/API server now on port ${PORT}!`);
});
