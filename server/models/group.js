const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name: {
    type: String,
    required: "Name is required."
  },

  description: {
    type: String
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: "An Owner is required"
  },

  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  listing: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: "A Listing is required"
  },

  created: {
    type: Date,
    default: Date.now()
  }
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
