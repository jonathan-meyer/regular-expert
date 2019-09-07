const express = require("express");
const passport = require("passport");

const User = require("../models/user");

const router = express.Router();

router.get("/profile", (req, res) => {
  res.json(req.user || {});
});

router.post("/", (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  // ADD VALIDATION

  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log("User.js post error: ", err);
      res.sendStatus(500);
    } else if (user) {
      res.status(400).json({
        error: `Sorry, already a user with the username: ${username}`
      });
    } else {
      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password
      });

      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
      });
    }
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

router.get("/", (req, res, next) => {
  res.json({ user: req.user });
});

router.all("/logout", (req, res) => {
  if (req.user) {
    req.logout();
  }

  res.send({ username: null, msg: "logging out" });
});

module.exports = router;
