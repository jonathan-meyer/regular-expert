const express = require("express");

const crud = require("../../controllers/crud");
const User = require("../models/user");

const router = express.Router();

router.use("/realtor", require("./realtor"));

router.use("/comment", crud(require("../models/comment")));
router.use("/group", crud(require("../models/group")));
router.use("/listing", crud(require("../models/listing")));

router.use("/user/list", (req, res) => {
  User.find({}, "_id firstName lastName", (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

router.use("/user", crud(User));

module.exports = router;
