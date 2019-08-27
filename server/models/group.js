const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name: {
    type: String,
    required: "Group Name is required."
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: "you need an UserID"
  },

  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  ],

  created: {
    type: Date,
    default: Date.now()
  }
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
