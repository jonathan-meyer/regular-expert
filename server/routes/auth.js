const express = require("express");
const passport = require("passport");

const router = express.Router();

router.post(
  "/local",
  passport.authenticate("local", { failureRedirect: "/" }),
  function(req, res) {
    res.redirect("/");
  }
);

router.get(
  "/local/callback",
  passport.authenticate("local", (req, res) => {
    res.redirect("/");
  })
);

module.exports = router;
