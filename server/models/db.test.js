const mongoose = require("mongoose");
const db = require("./server/models");

db.Comment.create({
  content: "fred is awesome",
  owner: mongoose.Types.ObjectId() // generates id that doesn't belong to any model.
})
  .then(data => console.log(data))
  .catch(err => console.log(err.message));