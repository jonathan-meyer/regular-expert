require("dotenv").config();

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");

const passport = require("./passport");

const PORT = process.env.PORT || 3001;

const app = express()
  // middlewares
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(morgan("tiny"))

  // setup sessions
  .use(
    session({
      secret: "b3cfe381-7dd7-4887-8401-c58d33e3649d",
      name: "lfht-secret",
      resave: true,
      saveUninitialized: false
    })
  )

  // setup passport
  .use(passport.initialize())
  .use(passport.session())

  // routes
  .use(require("./routes"));

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
  console.log(`🌎  ==> HTML/API server now on port ${PORT}!`);
});
