const express = require("express");
const passport = require("passport");

const router = express.Router();

router.post('/auth/local', 
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
});
  
router.get("/auth/local/callback",
passport.authenticate(("local"),
    (req, res) => {
        res.redirect("/");
    })
);

module.exports = router;