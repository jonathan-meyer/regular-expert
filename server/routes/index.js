const express = require("express");
const acl = require("express-acl");

const router = express.Router();

acl.config({
  filename: "acl.json",
  baseUrl: "/",
  defaultRole: "guest",
  roleSearchPath: "user.role"
});

router
  .use(
    acl.authorize.unless({
      path: [/^\/auth/]
    })
  )

  .use("/api", require("./api"))
  .use("/auth", require("./auth"));

module.exports = router;
