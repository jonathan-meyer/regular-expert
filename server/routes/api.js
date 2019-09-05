const express = require("express");
const passport = require("passport");

const crud = require("../../controllers/crud");

const router = express.Router();

router.use("/realtor", require("./realtor"));

const auth = (req, res, next) => {
  req.user ? next() : res.send(401);
};

router.use("/comment", auth, crud(require("../models/comment")));
router.use("/group", auth, crud(require("../models/group")));
router.use("/listing", auth, crud(require("../models/listing")));
router.use(
  "/user",
  (req, res, next) => {
    req.user && req.user.username === "root" ? next() : res.send(401);
  },
  crud(require("../models/user"))
);

module.exports = router;
