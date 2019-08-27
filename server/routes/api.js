const express = require("express");

const crud = require("../../controllers/crud");

const router = express.Router();

router.use("/realtor", require("./realtor"));

router.use("/comment", crud(require("../models/comment")));
router.use("/group", crud(require("../models/group")));
router.use("/listing", crud(require("../models/listing")));
router.use("/user", crud(require("../models/user")));

module.exports = router;
