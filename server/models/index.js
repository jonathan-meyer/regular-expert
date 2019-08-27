const mongoose = require("mongoose");

module.exports = {
  Comment: require("./comment"),
  Group: require("./group"),
  Listing: require("./listing"),
  User: require("./user")
};
