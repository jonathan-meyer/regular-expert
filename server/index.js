require("dotenv").config();

const path = require("path");
const express = require("express");
const morgan = require("morgan");

const PORT = process.env.PORT || 3001;

const app = express()
  // middlewares
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(morgan("tiny"))

  // routes
  .use(require("./routes"));

// static files
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "..", "build")));
}

const server = app.listen(PORT, () => {
  console.log(`🌎 ==> HTML/API server now on port ${PORT}!`);
});
