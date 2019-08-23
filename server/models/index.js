const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/lfht", {
  useNewUrlParser: true
});

module.exports = {
  Comment: require("./comment"),
  Group: require("./group"),
  Listing: require("./listing"),
  User: require("./user")
};
